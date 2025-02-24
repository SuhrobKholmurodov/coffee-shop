export const calculateTotalCount = (cartItems: { count: number }[]) =>
  cartItems.reduce((sum, item) => sum + item.count, 0)
