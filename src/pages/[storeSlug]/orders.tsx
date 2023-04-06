import { type NextPage } from "next"
import type { Store } from "@prisma/client"
import type { GetServerSidePropsContext } from "next"
import { PrismaClient } from "@prisma/client"
import { api } from "../../utils/api"
import { useEffect, useState } from "react"
import type { Order } from "@prisma/client"
import useSound from "use-sound"
import { useSession } from "next-auth/react"
import { OrderComponent } from "../../components/OrdersScreen/OrderComponent"
import { OrderDetailsComponent } from "../../components/OrdersScreen/OrderDetailsComponent"

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

  api.order.getByStoreId.useQuery(
    { id: store.id },
    {
      enabled: !!session && isUserHasAccess,
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      onSettled: (data) => setOrders(data ?? []),
    }
  )

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
  if (selectedOrder)
    return (
      <OrderDetailsComponent
        handleBackClick={handleBackClick}
        handleMarkReadyClick={handleMarkReadyClick}
        selectedOrder={selectedOrder}
        store={store}
      />
    )
  else
    return (
      <div className="h-screen w-screen">
        <div className="flex w-full flex-row  items-center bg-slate-800 px-2">
          <h1 className=" p-3 font-poppins text-4xl font-bold text-white">
            Orders
          </h1>
          <h3 className="grow text-right text-white">{store.name}</h3>
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
