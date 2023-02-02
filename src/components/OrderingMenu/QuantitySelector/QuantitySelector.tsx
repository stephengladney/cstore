import {
  MinusButton,
  PlusButton,
  QuantityAmount,
} from "./QuantitySelector.styles"

export function QuantitySelector({
  decreaseQuantity,
  increaseQuantity,
  quantity,
}: {
  decreaseQuantity: () => void
  increaseQuantity: () => void
  quantity: number
}) {
  return (
    <div className="flex flex-row">
      <MinusButton onClick={decreaseQuantity} />
      <QuantityAmount>{quantity}</QuantityAmount>
      <PlusButton onClick={increaseQuantity} />
    </div>
  )
}
