import type { CartItem } from "../types/Cart"

export interface OrderForParsing {
  id: number
  items: CartItem[]
  customerName: string
  customerPhone: string
  subtotal: number
  tax: number
  total: number
  storeId: number
}

export function getCheckoutPricingFromCartItems(
  items: CartItem[],
  tip = 0,
  deliveryFee = 0
): {
  deliveryFee: number
  subtotal: number
  tax: number
  tip: number
  total: number
} {
  const subtotal = items.reduce((acc, item) => acc + Number(item.price), 0)
  const tax = items.reduce(
    (acc, item) => acc + 0 * item.price * item.quantity,
    0
  )
  const total = subtotal + tax + tip + deliveryFee

  return { deliveryFee, subtotal, tax, tip, total }
}

export function money(n: number) {
  return `$ ${n.toFixed(2)}`
}

export function getEmailBodyForOrder(order: OrderForParsing): string {
  const { items, customerName, id } = order
  let result = `<h1 style="font-size: 2em; font-family: Verdana, Geneva, Tahoma, sans-serif">
  #${id} ${customerName}
</h1>
<div
  style="
    display: inline-block;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: 500px;
  "
>
<table style="width: 100%; border: 1px solid gray; margin-bottom: 20px">
<tr>
  <td style="text-align: center; border-right: 1px solid gray">
    <div>Placed at</div>
    <div>${new Date().toLocaleTimeString()}</div>
  </td>
  <td style="text-align: center">
    <div>Pickup at</div>
    <div>${new Date().toLocaleTimeString()}</div>
  </td>
</tr>
</table>

<table
style="
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: large;
  width: 100%;
"
>
`

  items.forEach((item) => {
    result += `<tr><td>${item.quantity} x</td><td">${
      item.name
    }</td><td style="text-align: right">$${Number(item.price).toFixed(
      2
    )}</td></tr>`
  })
  result += `
  </table>
  <table
    style="
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: large;
      margin-top: 40px;
      width: 100%;
    "
  >
    <tr>
      <td>Subtotal</td>
      <td style="text-align: right">$ ${Number(order.subtotal).toFixed(2)}</td>
    </tr>
    <tr>
      <td>Tax</td>
      <td style="text-align: right">$ ${Number(order.tax).toFixed(2)}</td>
    </tr>
    <tr>
      <td>TOTAL</td>
      <td style="text-align: right">$ ${Number(order.total).toFixed(2)}</td>
    </tr>
  </table>
</div>
  `
  return result
}
