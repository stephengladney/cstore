import { type NextPage } from "next"
import type { Store } from "../../types/Store"
import type { GetServerSidePropsContext } from "next"
import { PrismaClient } from "@prisma/client"
import { api } from "../../utils/api"
import type { CartItem } from "../../types/Cart"
import { useEffect, useState } from "react"
import type { Order } from "@prisma/client"
import useSound from "use-sound"
import { BiArrowBack } from "react-icons/bi"
import {
  LineItem,
  PriceLineItem,
} from "../../components/CallbackHandler/CallbackHandler.styles"
import { PricingContainer } from "../../components/OrderCart/CartPricing/CartPricing.styles"
import { useSession } from "next-auth/react"

const prisma = new PrismaClient()

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

const Orders: NextPage<{ store: Store }> = ({ store }: { store: Store }) => {
  const { data: session } = useSession({ required: true })
  const [orders, setOrders] = useState([] as Order[])
  const [selectedOrder, setSelectedOrder] = useState<Order>()
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

  const { data: delivery } = api.delivery.getByOrderId.useQuery(
    { orderId: selectedOrder?.id as number },
    { enabled: !!selectedOrder }
  )

  useEffect(() => {
    if (orders.filter((order) => !order.isAccepted).length > 0) playAlert()
  }, [orders, playAlert])

  const updateOrderLocally = (orders: Order[], orderId: number) => {
    const index = orders.findIndex((order) => order.id === orderId)
    const newOrders = [...orders]
    newOrders[index]!.isAccepted = true
    setOrders(newOrders)
  }
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    updateOrderLocally(orders, order.id)
  }

  const handleBackClick = () => setSelectedOrder(undefined)

  if (isLoading) return <div>Loading...</div>
  if (!isLoading && !isUserHasAccess) return <div>Not Allowed</div>
  if (selectedOrder)
    return (
      <div>
        <div className="flex flex-row items-center">
          <BiArrowBack
            size={52}
            className="my-4 ml-4 mr-2"
            onClick={handleBackClick}
          />
          {/* <span className="text-2xl">Back to orders</span> */}
        </div>
        <h1 className="mt-12 mb-4 text-center font-poppins text-6xl font-bold">
          #{selectedOrder.id} {selectedOrder.customerName}
        </h1>
        <h3
          className="py-4 text-center font-poppins text-3xl font-bold"
          style={{ color: store.color }}
        >
          {capitalizeFirstLetter(selectedOrder.type as string)}
        </h3>
        {selectedOrder.type === "delivery" && (
          <h4 className="text-center font-poppins text-lg">
            Doordash Support Reference
            <br />#{delivery?.supportReference ?? ""}
          </h4>
        )}
        <div className="p-12 font-poppins text-3xl">
          <div className="grid grid-cols-[1fr,1fr] rounded-xl border-[1px] border-solid border-slate-500">
            <div className="flex flex-col items-center border-r border-solid border-slate-500 p-2 text-2xl font-bold">
              <div>Placed at</div>
              <div className="mt-2 font-normal">4:01 PM</div>
            </div>
            <div className="flex flex-col items-center border-r border-solid border-slate-500 p-2 text-2xl font-bold">
              <div>Pickup at</div>
              <div className="mt-2 font-normal">4:16 PM</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-[1fr,5fr,2fr] font-poppins">
            {selectedOrder.items.map((item, i) => (
              <LineItem key={i} item={item as CartItem} />
            ))}
          </div>
          <div className="mt-12 font-poppins">
            <PricingContainer>
              <PriceLineItem
                name="Subtotal"
                amount={Number(selectedOrder.subtotal)}
              />
              <PriceLineItem name="Tax" amount={Number(selectedOrder.tax)} />
              <PriceLineItem
                name="Total"
                amount={Number(selectedOrder.total)}
              />
            </PricingContainer>
          </div>
          <div className="mt-16 flex flex-row justify-center">
            <button
              className="bold flex w-[300px] items-center justify-center rounded-full p-5 font-poppins font-bold text-slate-50"
              style={{ backgroundColor: store.color }}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    )
  else
    return (
      // <div className="grid w-screen grid-cols-[1fr,2fr]">
      <div className="h-screen w-screen">
        <h1 className="bg-slate-800 p-3 font-poppins text-4xl font-bold text-white">
          Orders
        </h1>
        {orders?.map((order) => {
          const s = order.items.length > 1 ? "s" : ""
          return (
            <div
              key={order.id}
              className={`cursor-pointer border-b-[1px] border-solid border-gray-300 p-4 ${
                !order.isAccepted ? "bg-green-300" : "bg-white"
              }`}
              onClick={() => handleOrderClick(order)}
            >
              <div className="grid grid-cols-[1fr,1fr] text-xl font-bold">
                <div>
                  #{order.id} {order.customerName}
                </div>
                <div className="text-right">
                  {order.items.length} item{s}
                </div>
              </div>
            </div>
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
