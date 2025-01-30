export type CartItem = {
  id: string
  name: string
  category: number
  imageUrl: string
  price: number
  options: {
    first: string[]
    second: string[]
  }
  count: number;
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
