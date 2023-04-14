import type { GetServerSidePropsContext, NextPage } from "next"
import { type Store, type Order, PrismaClient } from "@prisma/client"
import { api } from "../../utils/api"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import { useSession } from "next-auth/react"
import { OrderComponent } from "../../components/OrdersScreen/OrderComponent"
import { OrderDetailsComponent } from "../../components/OrdersScreen/OrderDetailsComponent"
import Head from "next/head"

const prisma = new PrismaClient()

function isOrderUnconfirmed(order: Order) {
  return order.status === "unconfirmed"
}

const Orders: NextPage<{ store: Store }> = ({ store }: { store: Store }) => {
  const { data: session, status } = useSession({ required: true })
  const [orders, setOrders] = useState([] as Order[])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [playAlert] = useSound("/bell.wav")

  const { data: user, isLoading } = api.user.getByEmail.useQuery(
    { email: session?.user.email as string },
    { enabled: !!session }
  )

  const isUserHasAccess = !!user && user.stores.includes(store.id)

  // Order poller
  api.order.getOrdersTodayByStoreId.useQuery(store.id, {
    enabled: !!session && isUserHasAccess,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    onSettled: (data) => setOrders(data ?? []),
  })

  const { mutate: confirmOrder } = api.order.confirm.useMutation()
  const { mutate: markReady } = api.order.markReady.useMutation()

  useEffect(() => {
    if (orders.filter((order) => isOrderUnconfirmed(order)).length > 0)
      playAlert()
  }, [orders, playAlert])

  useEffect(() => {
    if (selectedOrder && isOrderUnconfirmed(selectedOrder)) {
      confirmOrder(selectedOrder.id)
      updateOrderStatusLocally(selectedOrder.id, "confirmed")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder])

  const updateOrderStatusLocally = (orderId: number, status: string) => {
    const index = orders.findIndex((order) => order.id === orderId)
    const newOrders = [...orders]
    newOrders[index]!.status = status
    setOrders(newOrders)
  }

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleMarkReadyClick = () => {
    markReady(selectedOrder!.id)
    updateOrderStatusLocally(selectedOrder!.id, "complete")
    setSelectedOrder(null)
  }

  const handleBackClick = () => setSelectedOrder(null)

  if (isLoading || status === "loading") return <div>Loading...</div>
  if (!isLoading && !isUserHasAccess) return <div>Not Allowed</div>

  return (
    <>
      <Head>
        <title>{`Online Orders`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {selectedOrder && (
        <OrderDetailsComponent
          handleBackClick={handleBackClick}
          handleMarkReadyClick={handleMarkReadyClick}
          selectedOrder={selectedOrder}
          store={store}
        />
      )}
      {!selectedOrder && (
        <div className="h-screen w-screen">
          <div
            className="flex w-full flex-row  items-center px-2"
            style={{ backgroundColor: store.color }}
          >
            <h1 className=" p-3 font-poppins text-4xl font-bold text-white">
              Orders
            </h1>
            <h3 className="grow text-right font-poppins text-white">
              {store.name}
            </h3>
          </div>
          <div className="grid grid-cols-[0.5fr,1.5fr,1fr,1fr,0.75fr] border-b-[1px] border-solid border-slate-400 bg-slate-300 p-4 text-xl font-bold">
            <h1>#</h1>
            <h1>Customer</h1>
            <h1 className="text-center">Type</h1>
            <h1 className="text-center">Pickup at</h1>
            <h1 className="text-right">Item Count</h1>
          </div>
          {orders?.map((order: Order, i) => {
            return (
              <OrderComponent
                key={`order-${i}`}
                order={order}
                handleSelectOrder={handleSelectOrder}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Orders

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const store = await prisma.store.findFirst({
      where: { slug: context.query.storeSlug as string },
    })
    await prisma.$disconnect()

    if (store) {
      const { id, color, name, address, slug } = store
      return { props: { store: { id, color, name, address, slug } } }
    } else return { redirect: { destination: "/" } }
  } catch (e) {
    return { props: {} }
  }
}
