import { useContext } from "react"
import { storeContext } from "../../../contexts/storeContext"
import type { ReactComponents } from "../../../types/React"

export function ItemContainer({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ReactComponents & {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      className="grid animate-fadein cursor-pointer grid-cols-8 border-b border-solid border-[#ddd] py-4 px-3 font-poppins text-base hover:bg-slate-100"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export function ItemCategory({ children }: ReactComponents) {
  const store = useContext(storeContext)
  return (
    <span
      className="col-span-5 col-start-2  mb-1 font-poppins font-bold"
      style={{ color: store.color }}
    >
      {children}
    </span>
  )
}

export function ItemName({ children }: ReactComponents) {
  return (
    <span className="col-span-5 col-start-2 font-poppins font-bold text-gray-700">
      {children}
    </span>
  )
}

export function ItemQuantity({ children }: ReactComponents) {
  return (
    <span className="col-span-1 col-start-1 font-poppins font-bold text-gray-700">
      {children}
    </span>
  )
}

export function ItemPrice({ children }: ReactComponents) {
  return (
    <span className="col-span-2 text-right font-poppins text-gray-700">
      {children}
    </span>
  )
}

export function RemoveItemButtonContainer({ children }: ReactComponents) {
  return (
    <div className="col-span-1 col-start-8 row-span-2 row-start-1  flex flex-row items-center justify-end">
      {children}
    </div>
  )
}

export function RemoveItemButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <span className="text-sm text-red-600 hover:underline" onClick={onClick}>
      Remove
    </span>
    // <button
    //   className="animate-fadein cursor-pointer rounded-full bg-red-600 px-[8px] py-[1px] text-base text-white hover:bg-red-500"
    //   onClick={onClick}
    // >
    //   {children}
    // </button>
  )
}
// export const RemoveItemButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `

// export const ItemInstructions = styled.span`
//   color: ${(p) => getColor("red")};
//   display: block;
//   font-family: Poppins;
//   font-size: 15px;
//   margin-top: 5px;
//   transition: color 1.2s;
// `

// export const RemoveItemButton = styled.button`
//   background: #c00;
//   border: 1px solid #c00;
//   border-radius: 50px;
//   cursor: pointer;
//   font-size: 18px;
//   height: 24px;
//   line-height: 24px;
//   margin-top: -12px;
//   padding: 0px 0px 2px 0px;
//   width: 24px;

//   &:hover {
//     background: #d00;
//   }
// `
