import {
  CartItemsContainer,
  CheckoutContainer,
} from "../OrderCart/OrderCart.styles"
import { CartPricing } from "../OrderCart/CartPricing/CartPricing"
import { CartItemComponent } from "../OrderCart/CartItem/CartItem"

import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { env } from "../../env/client.mjs"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { cartContext } from "../../contexts/cartContext"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import { CheckoutForm } from "./CheckoutForm"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import PlacesAutocomplete from "react-places-autocomplete"

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const FulfillmentMethods = { PICKUP: "PICKUP", DELIVERY: "DELIVERY" } as const

export function Checkout() {
  const { cart } = useContext(cartContext)
  const store = useContext(storeContext)
  const { total } = getCheckoutPricingFromCartItems(cart.items)
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<keyof typeof FulfillmentMethods>("PICKUP")
  const [paymentIntentId, setPaymentIntentId] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()

  const isPickupSelected = fulfillmentMethod === "PICKUP"
  const isDeliverySelected = fulfillmentMethod === "DELIVERY"
  const totalWithDelivery = Number(Number(total) + 9.75).toFixed(2)

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })

  const stripeOptions = {
    clientSecret,
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Poppins",
      },
    ],
    appearance: {
      theme: "stripe",
      variables: { borderRadius: "8px", fontFamily: "Poppins" },
    } as { theme: "stripe" },
  }

  useEffect(() => {
    if (!paymentIntentId) {
      axios
        .post("/api/payment/payment_intent", {
          amount: total,
          stripeAccountId: store.stripeAccountId,
        })
        .then(({ data: { id, clientSecret } }) => {
          setClientSecret(clientSecret as string)
          setPaymentIntentId(id as string)
        })
        .catch(() => {
          // NO OP
        })
    } else {
      axios
        .put("/api/payment/payment_intent", {
          field: "amount",
          paymentIntentId: paymentIntentId,
          value: isDeliverySelected ? totalWithDelivery : totalWithDelivery,
        })
        .then(() => {
          // NO OP
        })
        .catch(() => {
          //NO OP
        })
    }
  }, [fulfillmentMethod, store.stripeAccountId, cart.items])

  return (
    <div>
      {/* <CartItemsContainer>
        {cart.items.map((item, i) => (
          <CartItemComponent
            index={i}
            key={`cart-item-${i}`}
            item={item}
            onClick={() => null}
          />
        ))}
      </CartItemsContainer>
      <CheckoutContainer>
        <CartPricing
          label="Subtotal"
          amount={subtotal}
          style={{ color: "#666" }}
        />
        <CartPricing label="Tax" amount={tax} style={{ color: "#666" }} />
        <CartPricing
          isBig
          amount={total}
          label="Total"
          style={{ marginTop: "10px" }}
        />
      </CheckoutContainer> */}
      <h1
        className="w-full py-4 text-center font-poppins text-5xl font-bold"
        style={{ color: store.color }}
      >
        ${isDeliverySelected ? totalWithDelivery : Number(total).toFixed(2)}
      </h1>

      <div className="py-5">
        <ul className="flex flex-row justify-center gap-8">
          <li
            className={`text-slate- w-36 cursor-pointer
         rounded-full ${
           isPickupSelected ? "border-[3px]" : "border-2"
         } border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
            onClick={() => setFulfillmentMethod("PICKUP")}
            style={
              isPickupSelected
                ? {
                    borderColor: store.color,
                    color: store.color,
                  }
                : {}
            }
          >
            Pickup
          </li>
          <li
            className={`w-36 cursor-pointer rounded-full ${
              isDeliverySelected ? "border-[3px]" : "border-2"
            } border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
            onClick={() => setFulfillmentMethod("DELIVERY")}
            style={
              isDeliverySelected
                ? { borderColor: store.color, color: store.color }
                : {}
            }
          >
            Delivery
          </li>
        </ul>
      </div>
      <div
        className={`py-4 lg:pb-8 ${
          isDeliverySelected ? "grid grid-rows-[1fr,1fr]" : ""
        }`}
      >
        <div className="grid grid-cols-[1fr,1fr] gap-4">
          <div>
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-[#30313D]">
              Name
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 font-poppins text-inherit text-[#30313D]"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
              value={customerInfo.name}
            />
          </div>
          <div>
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-[#30313D]">
              Phone number
            </label>
            {/* <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-inherit text-[#30313D] "
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
              value={customerInfo.phone}
            /> */}
            <PhoneInput
              country={"us"}
              countryCodeEditable={false}
              disableDropdown
              value={customerInfo.phone}
              onChange={(phone) =>
                setCustomerInfo({ ...customerInfo, phone: `+${phone}` })
              }
              inputClass={
                "block w-full rounded-lg border border-gray-300 p-2.5 text-inherit text-[#30313D] font-poppins"
              }
              containerClass={"rounded-lg"}
              containerStyle={{ minHeight: "46px" }}
              inputStyle={{ minHeight: "46px", maxWidth: "216px" }}
            />
          </div>
        </div>
        {isDeliverySelected && (
          <div className="relative mt-1">
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-[#30313D]">
              Address
            </label>
            <PlacesAutocomplete
              value={customerInfo.address}
              onChange={(address) =>
                setCustomerInfo({ ...customerInfo, address })
              }
              // onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Type your address...",
                      className:
                        "location-search-input w-full rounded-lg p-2.5 font-poppins border-gray-300 border-solid border-[1px]",
                    })}
                  />
                  <div
                    className={`autocomplete-dropdown-container absolute top-[100%] z-20 ${
                      suggestions.length > 4 ? "border-2 border-solid" : ""
                    } border-slate-200 bg-white py-2 px-4`}
                  >
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, i) => {
                      const className = suggestion.active
                        ? "suggestion-item--active py-2"
                        : "suggestion-item py-2"
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: "#fafafa",
                            cursor: "pointer",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                          }
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          key={i}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {/* <input
              name="address"
              type="text"
              id="address"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-inherit text-[#30313D] "
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomerInfo({ ...customerInfo, address: e.target.value })
              }
              value={customerInfo.address}
            /> */}
          </div>
        )}
      </div>
      {clientSecret && (
        <Elements stripe={stripe} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
