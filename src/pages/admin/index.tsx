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

function withMin(n: number, min: number) {
  return n > min ? n : min
}

const Admin: NextPage = () => {
  const { data: session } = useSession({ required: true })
  const { data: user, isLoading: isUserLoading } = api.user.getByEmail.useQuery(
    {
      email: session?.user.email as string,
    },
    { enabled: !!session }
  )
  const { data: stores, isLoading: isStoresLoading } =
    api.store.getByIds.useQuery(
      { ids: user?.stores || [] },
      { enabled: !!user }
    )

  const [selectedStore, setSelectedStore] = useState<Store>()
  const { data: orderTotalsForToday } =
    api.order.getOrdersTotalsForToday.useQuery(selectedStore?.id ?? 0, {
      enabled: !!selectedStore,
    })

  const { data: orderTotalsForThisMonth } =
    api.order.getOrdersTotalsForThisMonth.useQuery(selectedStore?.id ?? 0, {
      enabled: !!selectedStore,
    })

  useEffect(() => {
    if (stores && !selectedStore) setSelectedStore(stores[0] as Store)
  }, [stores, selectedStore])

  const grossToday = orderTotalsForToday?.total ?? 0
  const taxToday = orderTotalsForToday?.tax ?? 0
  const doordashFeesToday = withMin(
    (orderTotalsForToday?.total ?? 0) -
      (orderTotalsForToday?.subtotal ?? 0) -
      (orderTotalsForToday?.tax ?? 0),
    0
  )
  const netToday = grossToday - taxToday - doordashFeesToday

  const grossThisMonth = orderTotalsForThisMonth?.total ?? 0
  const taxThisMonth = orderTotalsForThisMonth?.tax ?? 0
  const doordashFeesThisMonth = withMin(
    (orderTotalsForThisMonth?.total ?? 0) -
      (orderTotalsForThisMonth?.subtotal ?? 0) -
      (orderTotalsForThisMonth?.tax ?? 0),
    0
  )
  const netThisMonth = grossThisMonth - taxThisMonth - doordashFeesThisMonth

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
              <h3 className="mb-3 text-xl underline">Today</h3>
              <div className="grid grid-cols-2">
                <h3 className="text-xl font-bold ">Gross Deposit</h3>
                <h3 className="text-xl font-bold ">
                  ${Number(grossToday).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl ">Doordash</h3>
                <h3 className="text-xl ">
                  ${Number(doordashFeesToday).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl ">Tax</h3>
                <h3 className="text-xl ">
                  ${Number(taxToday).toFixed(2) ?? "..."}
                </h3>

                <h3 className="text-xl font-bold text-green-600">Net Sales</h3>
                <h3 className="text-xl font-bold text-green-600">
                  ${Number(netToday).toFixed(2) ?? "..."}
                </h3>
              </div>
            </div>
            <div className="py-3">
              <h3 className="mb-3 text-xl underline">This Month</h3>
              <div className="grid grid-cols-2">
                <h3 className="text-xl font-bold ">Gross Deposit</h3>
                <h3 className="text-xl font-bold ">
                  ${Number(grossThisMonth).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Doordash</h3>
                <h3 className="text-xl">
                  ${Number(doordashFeesThisMonth).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Tax</h3>
                <h3 className="text-xl">
                  ${Number(taxThisMonth).toFixed(2) ?? "..."}
                </h3>

                <h3 className="text-xl font-bold text-green-600">Net Sales</h3>
                <h3 className="text-xl font-bold text-green-600">
                  ${Number(netThisMonth).toFixed(2) ?? "..."}
                </h3>
              </div>
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
  } else if (!isUserLoading && !isStoresLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="mb-8 text-center font-poppins text-3xl font-bold">
          Welcome to Farely!
        </h1>
        <h1 className="text-center font-poppins text-2xl">
          You do not have any stores set up yet.{" "}
          <br className="hidden md:block" />
          Please contact your account manager to create your first store.
        </h1>
      </div>
    )
  } else {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-center font-poppins text-2xl">Loading...</h1>
      </div>
    )
  }
}

export default Admin
