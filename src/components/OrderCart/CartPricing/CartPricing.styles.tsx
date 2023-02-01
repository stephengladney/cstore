import type { ReactComponents } from "../../../types/React"
import type { CSSProperties } from "react"

export function PricingContainer({
  children,
  style,
}: ReactComponents & { style?: CSSProperties }) {
  return (
    <div className="grid grid-cols-[3fr,1fr]" style={style}>
      {children}
    </div>
  )
}

export function PricingLabel({
  children,
  isBig,
  style,
}: ReactComponents & { isBig?: boolean; style?: CSSProperties }) {
  return (
    <span
      className={`col-span-1 font-poppins ${
        isBig ? "text-lg" : "text-base"
      } flex flex-row font-bold text-valero`}
      style={style}
    >
      {children}
    </span>
  )
}

export function PricingAmount({
  children,
  isBig,
  style,
}: ReactComponents & { isBig?: boolean; style?: CSSProperties }) {
  return (
    <span
      className={`text-right font-poppins ${
        isBig ? "text-lg" : "text-base"
      } font-bold`}
      style={style}
    >
      {children}
    </span>
  )
}
