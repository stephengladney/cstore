import type { Cart } from "../types/Cart"

export function getCheckoutPricingFromCart(cart: Cart): {
  subtotal: number
  tax: number
  total: number
} {
  const subtotal = cart.items.reduce((acc, item) => acc + Number(item.price), 0)
  const taxRate = 0.09
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return { subtotal, tax, total }
}

export function money(n: number) {
  return `$ ${n.toFixed(2)}`
}

export function getEmailBodyFromCart(cart: Cart): string {
  let result = "<table>"
  const { subtotal, tax, total } = getCheckoutPricingFromCart(cart)

  cart.items.forEach((item) => {
    result += `<tr><td>${item.quantity} x</td><td style="width: 100px;">${
      item.name
    }</td><td>$${Number(item.price).toFixed(2)}</td></tr>`
  })
  result += `</table><br />Subtotal: $${Number(subtotal).toFixed(2)}`
  result += `<br />Tax: $${Number(tax).toFixed(2)}`
  result += `<br /><br />TOTAL: $${Number(total).toFixed(2)}`
  return result
}
