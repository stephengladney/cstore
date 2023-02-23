import { type NextPage } from "next"
import { useEffect } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    const win: Window = window
    win.location = "https://aol.com"
  }, [])
  return <></>
}

export default Home
