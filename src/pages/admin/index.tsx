import { type NextPage } from "next"

const Admin: NextPage = () => {
  return (
    <div>
      <h1 className="mb-12 font-poppins text-2xl font-bold">Admin Dashboard</h1>
      <form action="/api/stripe/auth?id=1" method="POST">
        <button className="w-72 rounded-full bg-indigo-800 p-4 font-poppins font-bold text-white">
          Authorize Stripe
        </button>
      </form>
    </div>
  )
}

export default Admin
