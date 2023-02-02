import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import type { ReactComponents } from "../../../types/React"

export function MinusButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="box-border flex h-12 w-9 items-center justify-center bg-slate-300 pl-3 font-poppins font-bold"
      onClick={onClick}
      style={{ borderRadius: "25px 0px 0px 25px" }}
    >
      <AiOutlineMinus color="#333" />
    </button>
  )
}

export function PlusButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="box-border flex h-12 w-9 flex-row items-center justify-center bg-slate-300 pr-3"
      onClick={onClick}
      style={{ borderRadius: "0px 25px 25px 0px" }}
    >
      <AiOutlinePlus color="#333" />
    </button>
  )
}

export function QuantityAmount({ children }: ReactComponents) {
  return (
    <div className="flex h-12 w-9 select-none flex-row items-center justify-center bg-slate-300 font-poppins font-bold text-gray-800">
      {children}
    </div>
  )
}

// export const MinusButton = styled.div`
//   align-items: center;
//   background-color: #ddd;
//   box-sizing: border-box;
//   border-radius: 25px 0px 0px 25px;
//   cursor: pointer;
//   display: flex;
//   font-family: Poppins-Bold;
//   height: 50px;
//   justify-content: center;
//   padding-left: 10px;
//   text-align: center;
//   width: 35px;
// `

// export const PlusButton = styled.div`
//   align-items: center;
//   background-color: #ddd;
//   box-sizing: border-box;
//   border-radius: 0px 25px 25px 0px;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   font-family: Poppins-Bold;
//   height: 50px;
//   padding-right: 10px;
//   text-align: center;
//   width: 35px;
// `

// export const QuantityAmount = styled.div`
//   align-items: center;
//   background-color: #ddd;
//   color: #333;
//   cursor: pointer;
//   display: flex;
//   font-family: Poppins-Bold;
//   height: 50px;
//   justify-content: center;
//   width: 35px;
//   -webkit-touch-callout: none; /* iOS Safari */
//   -webkit-user-select: none; /* Safari */
//   -khtml-user-select: none; /* Konqueror HTML */
//   -moz-user-select: none; /* Old versions of Firefox */
//   -ms-user-select: none; /* Internet Explorer/Edge */
//   user-select: none;
// `
