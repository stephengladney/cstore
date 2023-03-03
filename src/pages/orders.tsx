import { type NextPage } from "next"
import type { Store } from "../types/Store"
import type { GetServerSidePropsContext } from "next"
import { PrismaClient } from "@prisma/client"
import { api } from "../utils/api"
import type { CartItem } from "../types/Cart"
import { useState } from "react"
import type { Order } from "@prisma/client"

const prisma = new PrismaClient()

const Orders: NextPage<{ store: Store }> = ({ store }: { store: Store }) => {
  const [orders, setOrders] = useState([] as Order[])
  const { data: ordersPolled } = api.order.getByStoreId.useQuery(
    {
      id: store.id,
    },
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: false,
      onSettled: (data) => {
        if (data?.filter((order) => order.id === 208)) {
          console.log("208 found!")
        }
        setOrders(ordersPolled ?? [])
      },
    }
  )

  const updateOrderLocally = (orders: Order[], orderId: number) => {
    const index = orders.findIndex((order) => order.id === orderId)
    const newOrders = [...orders]
    newOrders[index].status = true
    setOrders(newOrders)
  }

  return (
    <div className="grid w-screen grid-cols-[1fr,2fr]">
      <div className="h-screen cursor-pointer border-r-[1px] border-solid border-gray-300">
        {orders?.map((order) => (
          <div
            key={order.id}
            className={`border-b-[1px] border-solid border-gray-300 p-4 ${
              !order.status ? "bg-green-300" : "bg-white"
            }`}
            onClick={() => updateOrderLocally(orders, order.id)}
          >
            <div className="mb-4 text-2xl font-bold">
              #{order.id} {order.customerName}
            </div>
            {(order.items as CartItem[]).map((item: CartItem, i: number) => (
              <div key={i} className="text-xl">
                {item.quantity} x {item.name} $ {Number(item.price).toFixed(2)}
              </div>
            ))}
            <div className="mt-4">
              Subtotal: $ {Number(order.subtotal).toFixed(2)}
            </div>
            <div>Tax: $ {Number(order.tax).toFixed(2)}</div>
            <div>Total: $ {Number(order.total).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div>.</div>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const store = await prisma.store.findFirst({
      where: { slug: context.query.store as string },
    })
    await prisma.$disconnect()

    if (store) {
      const { id, color, name, address, slug } = store
      return { props: { store: { id, color, name, address, slug } } }
    }
  } catch (e) {
    return { props: {} }
  }
}
