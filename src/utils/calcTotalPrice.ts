import { CartItem } from "@/redux/cart/types"

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    const price = item.price
    return price ? sum + price * item.count : sum 
  }, 0)
}
