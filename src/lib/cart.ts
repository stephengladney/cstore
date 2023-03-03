import type { cart } from "../reducers/cartReducer"

export function getCartItemCount(cart: cart): number {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0)
}
