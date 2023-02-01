import {
  PricingAmount,
  PricingContainer,
  PricingLabel,
} from "./CartPricing.styles"

import type { CSSProperties } from "react"

export function CartPricing({
  amount,
  isBig,
  label,
  style,
}: {
  isBig?: boolean
  label: string
  amount: number
  style?: CSSProperties
}) {
  return (
    <PricingContainer>
      <PricingLabel isBig={isBig} style={style}>
        {label}
      </PricingLabel>
      <PricingAmount isBig={isBig} style={style}>
        $ {Number(amount).toFixed(2)}
      </PricingAmount>
    </PricingContainer>
  )
}
