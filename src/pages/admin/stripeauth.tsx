import { type NextPage } from "next"

const StripAuth: NextPage = () => {
  return (
    <>
      <form action="/api/stripe/auth?id=1" method="POST">
        <button>Authorize Stripe</button>
      </form>
    </>
  )
}

export default StripAuth
