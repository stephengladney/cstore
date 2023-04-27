import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { env } from "../../env/client.mjs"
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { cartContext } from "../../contexts/cartContext"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import { CheckoutForm } from "./CheckoutForm"
import { CartItemsContainer } from "../OrderCart/OrderCart.styles"
import { CartItemComponent } from "../OrderCart/CartItem/CartItem"
import { CartPricing } from "../OrderCart/CartPricing/CartPricing"
import { CheckoutContainer } from "../OrderCart/OrderCart.styles"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import PlacesAutocomplete from "react-places-autocomplete"

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const FulfillmentMethods = { PICKUP: "PICKUP", DELIVERY: "DELIVERY" } as const

interface CheckoutProps {
  closeModal: () => void
  isMobileCheckout: boolean
  setIsMobileCheckout?: Dispatch<SetStateAction<boolean>>
}

const doordashDeliveryItem = {
  id: 0,
  name: "Delivery",
  price: 7,
  quantity: 1,
  description: "Delivery by Doordash",
  categoryName: "",
  taxRate: 0,
}

export function Checkout({
  closeModal,
  isMobileCheckout,
  setIsMobileCheckout,
}: CheckoutProps) {
  const { cart } = useContext(cartContext)
  const store = useContext(storeContext)
  const [cartPricing, setCartPricing] = useState(
    getCheckoutPricingFromCartItems(cart.items)
  )
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<keyof typeof FulfillmentMethods>("PICKUP")
  const [paymentIntentId, setPaymentIntentId] = useState<string>()
  // const [deliveryPaymentIntentId, setDeliveryPaymentIntentId] =
  // useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()
  // const [deliveryClientSecret, setDeliveryClientSecret] = useState<string>()
  const [isAddressError, setIsAddressError] = useState(false)

  const isPickupSelected = fulfillmentMethod === "PICKUP"
  const isDeliverySelected = fulfillmentMethod === "DELIVERY"
  const [tip, setTip] = useState(Number(cartPricing.total * 0.2).toFixed(2))
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [cartToRender, setCartToRender] = useState(cart)

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

  const createOrder = () => {
    return axios.post("/api/order", {
      customerAddress: customerInfo.address,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      items: cart.items,
      deliveryInstructions,
      subtotal: cartPricing.subtotal,
      storeAddress: store.address,
      storeId: store.id,
      storeName: store.name,
      storePhone: store.phone,
      tax: cartPricing.tax,
      tip,
      total: cartPricing.total,
      type: isDeliverySelected ? "delivery" : "pickup",
    })
  }

  useEffect(() => {
    if (!paymentIntentId) {
      axios
        .post("/api/payment/payment_intent", {
          amount: cartPricing.total,
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
          value: cartPricing.total,
        })
        .finally(() => {
          // NO OP
        })
    }
    // if (isDeliverySelected && !deliveryPaymentIntentId) {
    //   axios
    //     .post("/api/payment/payment_intent", {
    //       amount: 9.75 + Number(tip),
    //       stripeAccountId: farelyStripeAccountId,
    //     })
    //     .then(({ data: { id, clientSecret } }) => {
    //       setDeliveryClientSecret(clientSecret as string)
    //       setDeliveryPaymentIntentId(id as string)
    //     })
    //     .catch(() => {
    //       // NO OP
    //     })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fulfillmentMethod, store.stripeAccountId, cart.items])

  useEffect(() => {
    if (fulfillmentMethod === "DELIVERY") {
      setCartToRender({
        ...cart,
        items: [...cart.items, doordashDeliveryItem],
      })
    } else {
      setCartToRender({
        ...cart,
        items: cart.items.filter((item) => item.name !== "Delivery"),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fulfillmentMethod])

  useEffect(() => {
    setCartPricing(getCheckoutPricingFromCartItems(cartToRender.items))
  }, [cartToRender])

  useEffect(() => {
    setCartToRender(cart)
  }, [cart])

  return (
    <div>
      {isMobileCheckout && (
        <>
          <CartItemsContainer>
            {cartToRender.items.map((item, i) => (
              <CartItemComponent
                index={i}
                key={`cart-item-${i}`}
                isItemRemovable={item.name !== "Delivery"}
                item={item}
                onClick={() => null}
              />
            ))}
          </CartItemsContainer>
          <CheckoutContainer>
            <CartPricing
              label="Subtotal"
              amount={cartPricing.subtotal}
              style={{ color: "#666" }}
            />
            <CartPricing
              label="Tax"
              amount={cartPricing.tax}
              style={{ color: "#666" }}
            />
            <CartPricing
              isBig
              amount={cartPricing.total}
              label="Total"
              style={{ marginTop: "10px" }}
            />
          </CheckoutContainer>
        </>
      )}
      <h1
        className="w-full py-2 text-center font-poppins text-5xl font-bold"
        style={{ color: store.color }}
      >
        ${Number(cartPricing.total).toFixed(2)}
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
        className={`py-1 lg:py-2 lg:pb-6 ${
          isDeliverySelected
            ? "grid grid-rows-[auto,auto] lg:grid-rows-[1fr,2fr]"
            : ""
        }`}
      >
        <div className="grid grid-rows-[1fr,1fr] lg:grid-cols-[1fr,1fr] lg:grid-rows-none lg:gap-4">
          <div>
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-[#30313D]">
              First & Last Name
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
            <label className="mb-2 block pt-1 font-poppins text-[14.88px] font-medium text-[#30313D] lg:pt-0">
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
                "block rounded-lg border border-gray-300 p-2.5 text-inherit text-[#30313D] font-poppins min-w-full"
              }
              containerClass={"rounded-lg"}
              containerStyle={{ minHeight: "46px" }}
              inputStyle={{ minHeight: "46px", maxWidth: "216px" }}
            />
          </div>
        </div>
        {isDeliverySelected && (
          <div className="relative">
            <label
              className={`block pt-3 pb-2 font-poppins text-[14.88px] font-medium ${
                isAddressError ? "text-red-600" : "text-[#30313D]"
              }`}
            >
              {isAddressError ? "Please enter a valid address." : "Address"}
            </label>
            <PlacesAutocomplete
              value={customerInfo.address}
              onChange={(address) => {
                setCustomerInfo({ ...customerInfo, address })
                if (isAddressError) setIsAddressError(false)
              }}
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
                      className: `location-search-input w-full rounded-lg p-2.5 font-poppins border-solid border-[1px] ${
                        isAddressError ? "border-red-600" : "border-gray-300"
                      }`,
                    })}
                  />
                  <div
                    className={`autocomplete-dropdown-container absolute top-[100%] z-[99] ${
                      suggestions.length > 0 ? "border-2 border-solid" : ""
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
            <div className="grid grid-cols-[2.5fr,1fr] lg:grid-cols-[3fr,1fr]">
              <div>
                <label className="block pt-3 pb-2 font-poppins text-[14.88px] font-medium text-[#30313D]">
                  Delivery instructions
                </label>
                <input
                  className="w-full rounded-lg border-[1px] border-solid border-gray-300 p-2.5 font-poppins"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setDeliveryInstructions(e.target.value)
                  }}
                />
              </div>
              <div className="flex flex-row justify-end">
                <div>
                  <label className="block pt-3 pb-2 pl-4 font-poppins text-[14.88px] font-medium text-[#30313D]">
                    Driver Tip
                  </label>
                  ${" "}
                  <input
                    className="w-20 rounded-lg border-[1px] border-solid border-gray-300 p-2.5 font-poppins"
                    value={tip}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setTip(e.target.value)
                    }}
                    type="number"
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                      setTip(Number(e.target.value).toFixed(2))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {clientSecret && (
        <Elements stripe={stripe} options={stripeOptions}>
          <CheckoutForm
            createOrder={createOrder}
            closeModal={closeModal}
            setIsMobileCheckout={setIsMobileCheckout}
            setIsAddressError={setIsAddressError}
          />
        </Elements>
      )}
    </div>
  )
}
