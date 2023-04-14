import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import type { ReactComponents } from "../../types/React"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "../../utils/api"
import type { Store } from "@prisma/client"

const SectionHeader = ({ children }: ReactComponents) => {
  return <h3 className="pb-6 text-2xl font-bold text-slate-700">{children}</h3>
}

const Admin: NextPage = () => {
  const { data: session } = useSession({ required: true })
  const { data: user } = api.user.getByEmail.useQuery(
    {
      email: session?.user.email as string,
    },
    { enabled: !!session }
  )
  const { data: stores } = api.store.getByIds.useQuery(
    { ids: user?.stores || [] },
    { enabled: !!user }
  )
  const [selectedStore, setSelectedStore] = useState<Store>()

  useEffect(() => {
    if (stores && !selectedStore) setSelectedStore(stores[0] as Store)
  }, [stores, selectedStore])

  if (stores && stores.length > 0) {
    return (
      <div className="p-8 font-poppins">
        <div className="grid grid-cols-2 items-center">
          <h1 className="font-poppins text-3xl font-bold text-slate-700">
            Admin Dashboard
          </h1>
          <div className="flex flex-row items-center justify-end">( )</div>
        </div>
        <div>
          {stores.map((store, i) => (
            <span className="mr-4" key={i}>
              {store.name}
            </span>
          ))}
        </div>
        <div className="mt-8 grid w-full grid-cols-3 gap-8">
          <div>
            <SectionHeader>Sales</SectionHeader>
            <div className="pb-3">
              <h3>Today</h3>
              <h3 className="text-xl font-bold text-green-600">$0.00</h3>
            </div>
            <div className="py-3">
              <h3>This Month</h3>
              <h3 className="text-xl font-bold text-green-600">$0.00</h3>
            </div>
          </div>
          <div>
            <SectionHeader>Menu</SectionHeader>
            <div className="pb-3">
              <h3>Categories</h3>
              <h3 className="text-xl font-bold">0</h3>
            </div>
            <div className="py-3">
              <h3>Items</h3>
              <h3 className="text-xl font-bold">0</h3>
            </div>
            <Link href="/menubuilder" className="text-blue-600 underline">
              Manage your menu
            </Link>
          </div>
          <div>
            <SectionHeader>Stripe</SectionHeader>
            {selectedStore?.stripeAccountId ? (
              <h3 className="font-bold text-green-600">Connected</h3>
            ) : (
              <h3 className="font-bold text-red-600">Not connected</h3>
            )}
            <h3>{selectedStore?.stripeAccountId || ""}</h3>
          </div>

          <div>.</div>
          <div>.</div>
          <div>.</div>
        </div>
      </div>
    )
  } else
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-center font-poppins text-2xl">
          You do not have any stores set up yet. <br />
          Please contact your account manager to create your first store.
        </h1>
      </div>
    )
}

export default Admin
