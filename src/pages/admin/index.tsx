import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import type { ReactComponents } from "../../types/React"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "../../utils/api"
import type { Store } from "@prisma/client"
import { OrderRecord } from "../../components/OrderRecord/OrderRecord"

const SectionHeader = ({ children }: ReactComponents) => {
  return <h3 className="pb-6 text-2xl font-bold text-slate-700">{children}</h3>
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
  const [transactionsDate, setTransactionsDate] = useState<string>()

  const { data: itemCount } = api.item.getItemCountByStoreId.useQuery(
    selectedStore?.id ?? 0,
    { enabled: !!session }
  )
  const { data: categoryCount } =
    api.category.getCategoryCountByStoreId.useQuery(selectedStore?.id ?? 0, {
      enabled: !!session,
    })
  const { data: orderTotalsForToday } =
    api.order.getOrdersTotalsForToday.useQuery(selectedStore?.id ?? 0, {
      enabled: !!selectedStore,
    })

  const { data: ordersForToday } = api.order.getOrdersByStoreIdAndDate.useQuery(
    {
      storeId: selectedStore?.id ?? 0,
      date: transactionsDate ?? new Date().toDateString(),
    }
  )

  const { data: orderTotalsForThisMonth } =
    api.order.getOrdersTotalsForThisMonth.useQuery(selectedStore?.id ?? 0, {
      enabled: !!selectedStore,
    })

  useEffect(() => {
    if (stores && !selectedStore) setSelectedStore(stores[0] as Store)
  }, [stores, selectedStore])

  const grossToday = orderTotalsForToday?.total ?? 0
  const taxToday = orderTotalsForToday?.tax ?? 0
  const salesToday = grossToday
  const netToday = salesToday - taxToday

  const grossThisMonth = orderTotalsForThisMonth?.total ?? 0
  const taxThisMonth = orderTotalsForThisMonth?.tax ?? 0
  const salesThisMonth = grossThisMonth
  const netThisMonth = salesThisMonth - taxThisMonth

  const handleDateChange = (date: string) => {
    const _date = new Date(date)
    _date.setHours(_date.getHours() + 5)
    setTransactionsDate(_date.toDateString())
  }

  if (stores && stores.length > 0) {
    return (
      <div className="p-8 font-poppins">
        <div className="grid grid-cols-2 items-center">
          <h1 className="font-poppins text-3xl font-bold text-slate-700">
            Admin Dashboard
          </h1>
          <div className="flex flex-row items-center justify-end"></div>
        </div>
        <div>
          {stores.map((store, i) => (
            <span
              className={`mr-4 ${
                selectedStore?.id === store.id ? "underline" : ""
              }`}
              key={i}
            >
              {store.name}
            </span>
          ))}
        </div>
        <div className="mt-8 grid max-w-[1600px] grid-rows-3 gap-8 lg:grid-cols-[0.75fr,1fr,0.5fr,0.5fr] lg:gap-28">
          <div>
            <SectionHeader>Sales</SectionHeader>
            <div className="pb-3">
              <h3 className="mb-3 text-xl underline">Today</h3>
              <div className="grid grid-cols-[3fr,1fr]">
                <h3 className="text-xl font-bold ">Gross Deposit</h3>
                <h3 className="text-right text-xl font-bold">
                  ${Number(grossToday).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Sales</h3>
                <h3 className="text-right text-xl">
                  ${Number(salesToday).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Tax</h3>
                <h3 className="text-right text-xl">
                  ${Number(taxToday).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl font-bold text-green-600">Net Sales</h3>
                <h3 className="text-right text-xl font-bold text-green-600">
                  ${Number(netToday).toFixed(2) ?? "..."}
                </h3>
              </div>
            </div>
            <div className="py-3">
              <h3 className="mb-3 text-xl underline">This Month</h3>
              <div className="grid grid-cols-[3fr,1fr]">
                <h3 className="text-xl font-bold">Gross Deposit</h3>
                <h3 className="text-right text-xl font-bold">
                  ${Number(grossThisMonth).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Sales</h3>
                <h3 className="text-right text-xl">
                  ${Number(salesThisMonth).toFixed(2) ?? "..."}
                </h3>
                <h3 className="text-xl">Tax</h3>
                <h3 className="text-right text-xl">
                  ${Number(taxThisMonth).toFixed(2) ?? "..."}
                </h3>

                <h3 className="text-xl font-bold text-green-600">Net Sales</h3>
                <h3 className="text-right text-xl font-bold text-green-600">
                  ${Number(netThisMonth).toFixed(2) ?? "..."}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <SectionHeader>Transactions</SectionHeader>
            Date:{" "}
            <input
              type="date"
              className="mb-4"
              onChange={(e) => handleDateChange(e.target.value)}
            />
            <div className="border-[1px] border-solid border-slate-300">
              {ordersForToday?.map((order, i) => (
                <OrderRecord key={i} order={order} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader>Menu</SectionHeader>
            <div className="pb-3">
              <h3>Categories</h3>
              <h3 className="text-xl font-bold">{String(categoryCount)}</h3>
            </div>
            <div className="py-3">
              <h3>Items</h3>
              <h3 className="text-xl font-bold">{String(itemCount)}</h3>
            </div>
            {/* <Link href="/menubuilder" className="text-blue-600 underline">
              Manage your menu
            </Link> */}
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
