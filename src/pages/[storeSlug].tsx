import { type NextPage } from "next"
import Head from "next/head"
// import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useReducer } from "react"
import { initialCartState, reducer } from "../reducers/cartReducer"
import { CartProvider } from "../contexts/cartContext"

import { Header } from "../components/Header/Header"
import { Body } from "../components/Body/Body"
import { OrderingContainer } from "../components/OrderingContainer/OrderingContainer"
import { NextRequest } from "next/server"
import type { Store } from "../types/Store"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const StoreHome: NextPage<{ store: Store }> = ({ store }: { store: Store }) => {
  const [cartState, dispatch] = useReducer(reducer, initialCartState)

  useEffect(() => {
    if (!store) {
      const win: Window = window
      win.location = "https://google.com"
    }
  }, [store])

  return store ? (
    <>
      <Head>
        <title>{String(store?.name)} - Order Online</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider value={{ cartState, dispatch }}>
        <div className="flex h-screen flex-col">
          <Header store={store} />
          <Body>
            <OrderingContainer />
          </Body>
        </div>
      </CartProvider>
    </>
  ) : (
    <></>
  )
}

export default StoreHome

export async function getServerSideProps({ req }: { req: NextRequest }) {
  try {
    const pathSlug = req.url.substring(1)
    const store = await prisma.store.findFirst({ where: { slug: pathSlug } })
    if (store) {
      const { name, address, slug } = store
      return { props: { store: { name, address, slug } } }
    } else {
      return { props: {} }
    }
  } catch (e) {
    return { props: {} }
  }
}

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession()

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   )

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   )
// }
