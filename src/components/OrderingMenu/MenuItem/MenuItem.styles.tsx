import type { ReactComponents } from "../../../types/React"
import Image from "next/image"

interface IsDisabled {
  isDisabled: boolean
}

export function MenuItemContainer({
  children,
  isDisabled,
}: ReactComponents & IsDisabled & { onClick?: () => void }) {
  return (
    <div
      className={`my-1 grid ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } my-1 grid grid-cols-[1fr,3fr] rounded-lg bg-white p-4 hover:bg-gray-100 sm:border-b lg:my-5 lg:border lg:border-solid lg:border-gray-300 lg:odd:col-span-1 lg:even:col-span-1`}
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
      } py-2 font-poppins text-[14px]`}
    >
      {children}
    </div>
  )
}

export function MenuItemHeader({ children }: ReactComponents) {
  return <div className="flex lg:flex-col lg:items-start">{children}</div>
}

export function MenuItemPrimaryContainer({ children }: ReactComponents) {
  return <div className="flex flex-col justify-center">{children}</div>
}

export function MenuItemSecondaryContainer({ children }: ReactComponents) {
  return <div className="flex flex-col justify-center">{children}</div>
}

export function MenuItemName({
  children,
  isDisabled,
}: ReactComponents & IsDisabled) {
  return (
    <div
      className={`font-poppins font-bold ${
        isDisabled ? "text-disabled" : ""
      } text-base`}
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
  return <span className="bold text-md font-poppins text-base">{children}</span>
}

export function MenuItemPriceContainer({ children }: ReactComponents) {
  return <div className="flex flex-grow justify-end">{children}</div>
}

export function UnavailablePill() {
  return (
    <div className="mx-1 rounded-3xl bg-gray-400 font-poppins text-xs">
      Unavailable
    </div>
  )
}
