import { useContext, useState } from "react"
import { storeContext } from "../../contexts/storeContext"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import type { StripeElements } from "@stripe/stripe-js/types/stripe-js"
import { useRouter } from "next/router"
import type { Dispatch, SetStateAction } from "react"

type CreateOrderResponse = {
  data: { order: { id: number }; delivery: { id: string } }
}
interface CheckoutFormProps {
  createOrder: () => Promise<any>
  closeModal: () => void
  setIsMobileCheckout?: Dispatch<SetStateAction<boolean>>
}
export function CheckoutForm({
  closeModal,
  createOrder,
  setIsMobileCheckout,
}: CheckoutFormProps) {
  const store = useContext(storeContext)
  const stripe = useStripe()
  const elements = useElements() as StripeElements
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handlePlaceOrder = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsPending(true)
    stripe!
      .confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url:
            "http://localhost:3000/api/payment/payment_intent/success",
        },
      })
      .then(() => {
        createOrder()
          .then(({ data }: CreateOrderResponse) => {
            router
              .push(
                `/${store.slug}?success=true&orderId=${data.order.id}${
                  data.delivery?.id ? `&deliveryId=${data.delivery.id}` : ""
                }`
              )
              .then(() => {
                setIsPending(false)
                closeModal()
                setIsMobileCheckout && setIsMobileCheckout(false)
              })
              .catch((e) => {
                setIsPending(false)
                alert(e)
              })
          })
          .catch((e) => {
            setIsPending(false)
            alert(e)
          })
      })
      .catch((e) => {
        console.log(e)
        setIsPending(false)
      })
  }

  return (
    <>
      <PaymentElement className="mt-4 lg:mt-0" />
      <div className="mt-6 flex w-full justify-center">
        <button
          className={`bold flex w-[250px] items-center justify-center rounded-full p-4 font-poppins font-bold text-slate-50 lg:mt-4`}
          disabled={!stripe}
          style={{ backgroundColor: isPending ? "#ccc" : store.color }}
          onClick={isPending ? () => null : handlePlaceOrder}
        >
          {isPending && <span className="button-loader mr-2"></span>}
          Place Order
        </button>
      </div>
    </>
  )
}
