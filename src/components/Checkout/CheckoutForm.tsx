import { useContext, useEffect } from "react"
import { storeContext } from "../../contexts/storeContext"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import type { StripeElements } from "@stripe/stripe-js/types/stripe-js"

export function CheckoutForm() {
  const store = useContext(storeContext)
  const stripe = useStripe()
  const elements = useElements() as StripeElements

  useEffect(() => {
    console.log(elements)
  }, [elements])

  const handlePlaceOrder = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    stripe!
      .confirmPayment({
        elements,
        confirmParams: {
          return_url:
            "http://localhost:3000/api/payment/payment_intent/success",
        },
      })
      .catch((e) => console.log(e))
  }

  return (
    <form action="/api/payment/payment_intent/confirm" method="POST">
      <PaymentElement />
      <div className="mt-6 flex w-full justify-center">
        <button
          className={`bold flex w-[200px] items-center justify-center rounded-full p-4 font-poppins font-bold text-slate-50`}
          disabled={!stripe}
          style={{ backgroundColor: store.color }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </form>
  )
}
