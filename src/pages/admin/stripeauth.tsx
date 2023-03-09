import { type NextPage } from "next"

const StripAuth: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-12 font-poppins text-2xl font-bold">
        Click here to connect Stripe
      </h1>
      <form action="/api/stripe/auth?id=1" method="POST">
        <button className="w-72 rounded-full bg-indigo-800 p-4 font-poppins font-bold text-white">
          Authorize Stripe
        </button>
      </form>
    </div>
  )
}

export default StripAuth
