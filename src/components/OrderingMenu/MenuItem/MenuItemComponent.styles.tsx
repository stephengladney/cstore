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
      } grid grid-rows-[130px,auto] rounded-lg bg-white p-2 hover:bg-slate-100 hover:drop-shadow-sm md:w-full md:grid-rows-none lg:grid-cols-[1fr,3fr]  lg:border lg:border-b lg:border-solid lg:border-gray-300 lg:p-3 lg:odd:col-span-1 lg:even:col-span-1`}
      onClick={onClick}
      // style={{ border: "1px solid green" }}
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
      } hidden py-2 font-poppins text-[14px] text-gray-600 lg:block`}
    >
      {children}
    </div>
  )
}

export function MenuItemHeader({ children }: ReactComponents) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start">{children}</div>
  )
}

export function MenuItemPrimaryContainer({ children }: ReactComponents) {
  return (
    <div className="flex flex-col justify-start lg:justify-center">
      {children}
    </div>
  )
}

export function MenuItemSecondaryContainer({ children }: ReactComponents) {
  return (
    <div className="flex flex-col justify-start lg:justify-center lg:px-4">
      {children}
    </div>
  )
}

export function MenuItemName({
  children,
  isDisabled,
}: ReactComponents & IsDisabled) {
  return (
    <div
      className={`pr-1 font-poppins font-semibold ${
        isDisabled ? "text-disabled text-slate-400" : " text-gray-800"
      } text-xs lg:text-base`}
    >
      {children}
    </div>
  )
}

export function MenuItemNameContainer({ children }: ReactComponents) {
  return (
    <div className="flex h-full items-center justify-start lg:flex-grow">
      {children}
    </div>
  )
  //  vertical-align: bottom?
}

export function MenuItemPhoto({
  isAvailable,
  src,
}: {
  isAvailable: boolean
  src: string
}) {
  return (
    <div className="relative h-[120px] w-[120px]">
      <Image
        src={src}
        alt="Product photo"
        fill
        // height={80}
        // width={80}
        className={`rounded-md border-[1px] border-solid border-gray-300 ${
          !isAvailable ? "grayscale" : ""
        }`}
      />
    </div>
  )
}

export function MenuItemPrice({ children }: ReactComponents) {
  return (
    <span className="lg:text-md mt-1 font-poppins text-xs font-semibold leading-4 text-gray-600">
      {children}
    </span>
  )
}

export function MenuItemPriceContainer({ children }: ReactComponents) {
  return (
    <div className="flex flex-grow justify-start lg:justify-end">
      {children}
    </div>
  )
}

export function UnavailablePill() {
  return (
    <div className="mx-2 hidden rounded-3xl bg-gray-300 px-2 py-1 font-poppins text-xs lg:block">
      Unavailable
    </div>
  )
}
