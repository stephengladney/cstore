import { useContext } from "react"
import { cartContext } from "../../contexts/cartContext"

interface CallbackHandlerProps {
  callback: string
}
export function CallbackHandler({ callback }: CallbackHandlerProps) {
  const { cartState } = useContext(cartContext)
  return <div>{callback}</div>
}
