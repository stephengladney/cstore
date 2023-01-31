import type { CartState } from "../reducers/cartReducer"

export function getCartItemCount(cart: CartState): number {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0)
}
