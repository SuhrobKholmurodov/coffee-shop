export type CartItem = {
  id: number
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
