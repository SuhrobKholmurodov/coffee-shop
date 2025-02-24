export const calculateAverageRating = (
  reviews: { rating: number }[]
): string => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  const average = reviews.length > 0 ? totalRating / reviews.length : 0
  return average.toFixed(1).replace(/\.0$/, '')
}
