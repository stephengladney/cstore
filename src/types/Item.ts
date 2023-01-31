export type Category = {
  name: string
  items: Item[]
}

export type Item = {
  category: string
  description?: string
  imageUrl: string
  isAvailable: boolean
  name: string
  options?: Option[]
  price: number
}

export type Option = {
  category: string
  name: string
  price: number
}
