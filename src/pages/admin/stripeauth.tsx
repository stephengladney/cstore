import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { api } from "../../utils/api"

const StripeAuth: NextPage = () => {
  const { data: session } = useSession({ required: true })
  const { data: user } = api.user.getByEmail.useQuery(
    { email: session?.user.email as string },
    { enabled: !!session }
  )
  const { data: stores } = api.store.getByIds.useQuery({
    ids: user?.stores ?? [],
  })
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-12 font-poppins text-2xl font-bold">
        Click here to connect Stripe
      </h1>
      <form action="/api/stripe/auth?id=1" method="POST">
        <button className="w-72 rounded-full bg-indigo-800 p-4 font-poppins font-bold text-white">
          Authorize Stripe
        </button>
      </form>
      <div className="mt-10">
        <h3>{user?.email}</h3>
        <h3>
          <select
            className="p-4 focus:outline-none"
            onChange={(e) => console.log(e.target.value)}
          >
            {stores?.map((store, i) => (
              <option key={i} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </h3>
      </div>
    </div>
  )
}

export default StripeAuth
