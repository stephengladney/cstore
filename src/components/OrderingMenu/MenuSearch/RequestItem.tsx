import { useContext } from "react"
import { storeContext } from "../../../contexts/storeContext"

export function RequestItem() {
  const store = useContext(storeContext)
  return (
    <div className="w-full py-12 px-8 text-center">
      <span className="font-poppins">
        Don&apos;t see what you&apos;re looking for?
        <br />
        <a href="sdf" className="underline" style={{ color: store.color }}>
          Click here to request an item
        </a>
      </span>
    </div>
  )
}
