import type { GetServerSidePropsContext, NextPage } from "next"
import Head from "next/head"
// import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useReducer } from "react"
import { reducer } from "../reducers/cartReducer"
import { CartProvider } from "../contexts/cartContext"

import { Header } from "../components/Header/Header"
import { Body } from "../components/Body/Body"
import { OrderingContainer } from "../components/OrderingContainer/OrderingContainer"
import type { Store } from "../types/Store"
import { PrismaClient } from "@prisma/client"
import { StoreProvider } from "../contexts/storeContext"
import { getCookie, hasCookie } from "cookies-next"
import { CallbackHandler } from "../components/CallbackHandler/CallbackHandler"

const prisma = new PrismaClient()

const StoreHome: NextPage<{ store: Store }> = ({
  callback,
  store,
}: {
  callback?: string
  store: Store
}) => {
  const [cart, dispatch] = useReducer(reducer, {
    items: [],
    slug: store.slug,
  })

  useEffect(() => {
    if (!store) {
      const win: Window = window
      win.location = "https://google.com"
    } else if (hasCookie(`swiftCart_${store.slug}`)) {
      dispatch({
        type: "RESTORE_CART",
        payload: getCookie(`swiftCart_${store.slug}`) as string,
      })
    }
  }, [store])

  if (store) {
    return (
      <>
        <Head>
          <title>{`${store.name} - Order Online`}</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StoreProvider value={store}>
          <CartProvider value={{ cart, dispatch }}>
            <div className="flex h-screen flex-col">
              <Header store={store} />
              <Body>
                {callback ? (
                  <CallbackHandler callback={callback} />
                ) : (
                  <OrderingContainer />
                )}
              </Body>
            </div>
          </CartProvider>
        </StoreProvider>
      </>
    )
  } else return null
}

export default StoreHome

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const propsToReturn: {
    props: { store: Store | null; callback: string | null }
  } = { props: { store: null, callback: null } }
  try {
    const store = await prisma.store.findFirst({
      where: { slug: context.query.storeSlug as string },
    })
    await prisma.$disconnect()

    if (store) {
      const { id, color, name, address, slug } = store
      propsToReturn.props.store = { id, color, name, address, slug }
    }

    if (context.query.canceled) {
      propsToReturn.props.callback = "canceled"
    } else if (context.query.success) {
      propsToReturn.props.callback = "success"
    }

    return propsToReturn
  } catch (e) {
    return propsToReturn
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
