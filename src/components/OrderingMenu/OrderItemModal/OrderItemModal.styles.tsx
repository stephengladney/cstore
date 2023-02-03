import Image from "next/image"
import type { ReactComponents } from "../../../types/React"

export function ModalWrapper({ children }: ReactComponents) {
  return (
    <div className="h-screen w-screen border border-solid border-gray-200 bg-white px-8 pt-20 pb-8 shadow-sm md:h-auto md:w-[475px] md:rounded-xl md:pt-2">
      {children}
    </div>
  )
}

export function ModalContent({ children }: ReactComponents) {
  return <div className="animate-fadein-1s">{children}</div>
}

export function CloseButton({ closeModal }: { closeModal: () => void }) {
  return (
    <button
      className="absolute top-4 right-4 rounded-full bg-slate-700 px-2 text-lg text-white outline-none hover:bg-slate-800"
      onClick={closeModal}
    >
      <div className="-mt-[2px]">&times;</div>
    </button>
  )
}

export function ItemHeader({ children }: ReactComponents) {
  return <div className="flex max-w-xs flex-row items-center">{children}</div>
}

export function ItemImage({ alt, src }: { alt: string; src?: string }) {
  return (
    <Image
      alt={alt}
      height={75}
      src={src || "/noimage.png"}
      width={75}
      className="md:h-24 md:w-24"
    />
  )
}

export function ItemInfo({ children }: ReactComponents) {
  return <div className="flex flex-row md:mt-16">{children}</div>
}

export function LeftContainer({ children }: ReactComponents) {
  return <div className="px-1">{children}</div>
}

export function RightContainer({ children }: ReactComponents) {
  return <div className="grow pl-3">{children}</div>
}

export function ItemName({ children }: ReactComponents) {
  return <div className="grow font-poppins text-2xl font-bold">{children}</div>
}

export function ItemPrice({ children }: ReactComponents) {
  return (
    <div className="min-w-[75px] grow pr-5 text-right align-middle font-poppins text-lg text-gray-600">
      {children}
    </div>
  )
}

export function ItemDescription({ children }: ReactComponents) {
  return (
    <div className="mt-3 font-poppins text-base text-gray-800">{children}</div>
  )
}

export function OrderButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="ml-5 block h-12 w-52 rounded-full bg-valero font-bold text-white md:w-64"
      onClick={onClick}
    >
      Add to Order
    </button>
  )
}

export function ButtonsContainer({ children }: ReactComponents) {
  return (
    <div className="mt-6 flex flex-row justify-center pt-6">{children}</div>
  )
}
// export const ItemHeader = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 20px 0px 10px 0px;
//   margin-right: 30px;
//   max-width: 300px;
// `

// export const InputLabel = styled.div`
//   color: ${(p) => getColor("grayDark")};
//   font-family: Poppins-Bold;
//   font-size: 14px;
// `

// export const SpecialIntructionsInput = styled.textarea`
//   background-color: ${(p) => getColor("white")};
//   color: ${(p) => getColor("black")};
//   font-family: Poppins;
//   font-size: 15px;
//   padding: 10px;
//   resize: none;
//   width: 100%;
//   height: 80px;
// `

// export const ButtonsContainer = styled.div`
//   border-top: 1px solid #ddd;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   margin-top: 25px;
//   padding-top: 20px;
// `
