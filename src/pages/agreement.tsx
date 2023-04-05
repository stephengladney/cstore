import { useState } from "react"
import type { NextPage } from "next"
import type { ReactComponents } from "../types/React"
import { BsFillBagCheckFill } from "react-icons/bs"
import Head from "next/head"

const Section = ({ children }: ReactComponents) => (
  <div className="pb-6">{children}</div>
)
const CategoryHeader = ({ children }: ReactComponents) => (
  <>
    <h2 className="px-2 py-4 text-4xl font-bold lg:text-2xl">{children}</h2>
    <div></div>
  </>
)

const InputLabel = ({ children }: ReactComponents) => (
  <h3 className="text-2xl lg:text-base">{children}</h3>
)

type PaymentMethod = "cc" | "ach"

const Agreement: NextPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cc")
  return (
    <>
      <Head>
        <title>Farely Merchant Agreement</title>
      </Head>
      <div className="mx-auto block min-w-[700px] max-w-4xl flex-col items-center p-4 font-poppins">
        <h1 className="flex justify-center">
          <BsFillBagCheckFill className="mt-4 mr-2 mb-[5px] text-8xl text-red-600 lg:text-6xl" />
        </h1>
        <h1 className="p-8 text-center text-5xl font-bold lg:text-5xl">
          Merchant Agreement
        </h1>
        <p className="p-4 pb-10 text-center text-2xl lg:text-base">
          We are very excited to work with you and your store! Please fill out
          the information below and review the terms of our subscription
          agreement. If you have any questions about anything on this form,
          please contact your sales representative.
        </p>
        <div>
          <Section>
            <CategoryHeader>Merchant Info</CategoryHeader>
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
              <div className="p-3">
                <InputLabel>Store Name</InputLabel>
                <input
                  type="text"
                  className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                />
              </div>
              <div className="p-3">
                <InputLabel>Primary Contact Name</InputLabel>
                <input
                  type="text"
                  className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                />
              </div>
            </div>
            <div className="p-3">
              <InputLabel>Store Address</InputLabel>
              <input
                type="text"
                className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
              />
            </div>
            <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
              <div className="p-3">
                <InputLabel>Primary Contact Email</InputLabel>
                <input
                  type="text"
                  className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                />
              </div>
              <div className="p-3">
                <InputLabel>Primary Contact Phone</InputLabel>
                <input
                  type="text"
                  className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                />
              </div>
            </div>
          </Section>
          <Section>
            <CategoryHeader>Payment</CategoryHeader>
            <div>
              <div className="inline-block py-3 pl-4 pr-2">
                <input
                  className="mr-2 h-8 w-8 lg:h-4 lg:w-4"
                  type="radio"
                  checked={paymentMethod === "cc"}
                  id="cc_radio"
                  name="payment_method"
                  onClick={() => setPaymentMethod("cc")}
                />
                <label htmlFor="cc_radio" className="text-2xl lg:text-base">
                  Credit Card
                </label>
              </div>
              <div className="inline-block px-4">
                <input
                  className="mr-2 h-8 w-8 lg:h-4 lg:w-4"
                  type="radio"
                  checked={paymentMethod === "ach"}
                  id="cc_ach"
                  name="payment_method"
                  onClick={() => setPaymentMethod("ach")}
                />
                <label htmlFor="ach_radio" className="text-2xl lg:text-base">
                  ACH
                </label>
              </div>
            </div>
            {paymentMethod === "cc" && (
              <div className="grid grid-rows-2 p-3 lg:grid-cols-[1fr,0.01fr,0.01fr] lg:grid-rows-none">
                <div className="p-3 pl-0">
                  <InputLabel>Card Number</InputLabel>
                  <input
                    type="text"
                    className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                  />
                </div>
                <div className="flex">
                  <div className="p-3 pl-0 lg:pl-3">
                    <InputLabel>Expiration</InputLabel>
                    <input
                      type="text"
                      className="w-48 rounded border-[1px] border-solid border-slate-500 p-6 lg:w-28 lg:p-2"
                    />
                  </div>

                  <div className="p-3">
                    <InputLabel>CVV</InputLabel>
                    <input
                      type="text"
                      className="w-32 rounded border-[1px] border-solid border-slate-500 p-6 lg:w-16 lg:p-2"
                    />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "ach" && (
              <>
                <div className="grid grid-rows-3 p-3 lg:grid-cols-2 lg:grid-rows-none">
                  <div className="p-3 pl-0">
                    <InputLabel>Routing Number</InputLabel>
                    <input
                      type="text"
                      className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                    />
                  </div>
                  <div className="p-3 pl-0">
                    <InputLabel>Account Number</InputLabel>
                    <input
                      type="text"
                      className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                    />
                  </div>
                  <div className="p-3 pl-0">
                    <InputLabel>Name on Account</InputLabel>
                    <input
                      type="text"
                      className="w-full rounded border-[1px] border-solid border-slate-500 p-6 lg:p-2"
                    />
                  </div>
                </div>
              </>
            )}

            {/* <h2 className="px-2 py-0 text-3xl font-bold lg:text-2xl">Notes</h2>
        <div className="p-3">
          <textarea
            className="w-full resize-none rounded border-[1px] border-solid border-slate-500 p-2"
            rows={4}
          />
        </div> */}
          </Section>
        </div>
        <CategoryHeader>Terms and Conditions</CategoryHeader>
        <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
          <div>
            <h3 className="px-2 py-4 text-2xl font-bold lg:text-base">
              Annual Commitment
            </h3>
            <p className="p-3 text-2xl lg:text-base">
              The term of this agreement will be for one year. Subsequent terms
              will also be for a term of one year and the agreement shall
              automatically renews on an annual basis. The merchant has the
              right to cancel their renewal at any time prior to the renewal
              date.
            </p>
          </div>
          <div>
            <h3 className="px-2 py-4 text-2xl font-bold lg:text-base">
              Hardware
            </h3>
            <p className="p-3 text-2xl lg:text-base">
              Farely will provide hardware to the merchant to use to access the
              application. The tablet remains the property of Farely and shall
              be returned in the event of a termination of service. Failure to
              return the hardware in working condition will result in a fee of
              $120.00 USD.
            </p>
          </div>
        </div>
        <button className="mt-16 mb-32 w-full rounded-full bg-slate-900 p-8 text-2xl text-white lg:p-4 lg:text-xl">
          I agree to the terms and conditions
        </button>
      </div>
    </>
  )
}

export default Agreement
