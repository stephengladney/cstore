import { useState } from "react"
import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { api } from "../../utils/api"
import type { StoreType } from "../../types/StoreType"

const StripeAuth: NextPage = () => {
  const { data: session } = useSession({ required: true })
  const { data: user } = api.user.getByEmail.useQuery(
    { email: session?.user.email as string },
    { enabled: !!session }
  )
  const { data: stores } = api.store.getByIds.useQuery(
    {
      ids: user?.stores ?? [],
    },
    {
      onSettled: (data) => {
        const stores = data as StoreType[]
        setStoreId(stores[0]?.id ?? null)
      },
    }
  )
  const [storeId, setStoreId] = useState<number | null>(null)

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="font-poppins text-2xl font-bold">
        Select your store and click Authorize
      </h1>
      <div className="my-8">
        <select
          className="p-4 focus:outline-none"
          onChange={(e) => setStoreId(Number(e.target.value))}
        >
          {stores?.map((store, i) => (
            <option key={i} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>
      <form action={`/api/stripe/auth?id=${storeId ?? ""}`} method="POST">
        <button
          className="w-72 rounded-full bg-indigo-800 p-4 font-poppins font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={!storeId}
        >
          Authorize Stripe
        </button>
      </form>
    </div>
  )
}

export default StripeAuth
