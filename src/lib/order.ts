import type { Cart } from "../types/Cart"

export function getEmailBodyFromCart(cart: Cart): string {
  let result = "<table>"
  const subtotal = cart.items.reduce((acc, item) => acc + Number(item.price), 0)
  const taxRate = 0.09
  const tax = subtotal * taxRate

  cart.items.forEach((item) => {
    result += `<tr><td>${item.quantity}x</td><td style="width: 100px;">${
      item.name
    }</td><td>$${Number(item.price).toFixed(2)}</td></tr>`
  })
  result += `</table><br />Subtotal: $${Number(subtotal).toFixed(2)}`
  result += `<br />Tax: $${Number(tax).toFixed(2)}`
  result += `<br /><br />TOTAL: $${Number(subtotal + tax).toFixed(2)}`
  return result
}
