export type Reviews = {
  profilePhoto: string
  name: string
  comment: string
  date: string
  rating: number
  recomendation: boolean
}

export type Products = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: number
  options: {
    first: string[]
    second: string[]
  }
  reviews: Reviews[]
  count: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error'
}

export interface ProductsSliceState {
  items: Products[]
  status: Status
  searchValue: string 
  categoryId: number
}

export type SearchProductsParams = {
  sortBy: string
  category: number
  order: string
  search: string
}
