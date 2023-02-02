import type { ReactComponents } from "../../../types/React"
import Image from "next/image"

interface IsDisabled {
  isDisabled: boolean
}

export function MenuItemContainer({
  children,
  isDisabled,
  onClick,
}: ReactComponents & IsDisabled & { onClick?: () => void }) {
  return (
    <div
      className={`grid ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } grid grid-cols-[1fr,3fr] rounded-lg bg-white p-3 hover:bg-slate-100 hover:drop-shadow-sm sm:border-b lg:border lg:border-solid lg:border-gray-300  lg:odd:col-span-1 lg:even:col-span-1`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function MenuItemDescription({
  children,
  isDisabled,
}: ReactComponents & IsDisabled) {
  return (
    <div
      className={`${
        isDisabled ? "text-disabled" : ""
      } py-2 font-poppins text-[14px] text-gray-600`}
    >
      {children}
    </div>
  )
}

export function MenuItemHeader({ children }: ReactComponents) {
  return <div className="flex flex-row lg:items-start">{children}</div>
}

export function MenuItemPrimaryContainer({ children }: ReactComponents) {
  return <div className="flex flex-col justify-center">{children}</div>
}

export function MenuItemSecondaryContainer({ children }: ReactComponents) {
  return <div className="flex flex-col justify-center px-4">{children}</div>
}

export function MenuItemName({
  children,
  isDisabled,
}: ReactComponents & IsDisabled) {
  return (
    <div
      className={`font-poppins font-semibold ${
        isDisabled ? "text-disabled text-slate-400" : " text-slate-800"
      } text-base `}
    >
      {children}
    </div>
  )
}

export function MenuItemNameContainer({ children }: ReactComponents) {
  return (
    <div className="flex h-full flex-grow items-center justify-start">
      {children}
    </div>
  )
  //  vertical-align: bottom?
}

export function MenuItemPhoto({ src }: { src: string }) {
  return <Image src={src} alt="Product photo" height={80} width={80} />
}

export function MenuItemPrice({ children }: ReactComponents) {
  return (
    <span className="text-md mt-1 font-poppins text-sm font-semibold leading-4 text-gray-600">
      {children}
    </span>
  )
}

export function MenuItemPriceContainer({ children }: ReactComponents) {
  return <div className="flex flex-grow justify-end">{children}</div>
}

export function UnavailablePill() {
  return (
    <div className="mx-1 rounded-3xl bg-gray-300 px-2 py-1 font-poppins text-xs">
      Unavailable
    </div>
  )
}
