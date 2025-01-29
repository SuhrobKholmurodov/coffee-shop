export type Products = {
  id: number
  name: string
  category: number
  price: number
  description: string
  imageUrl: string
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error'
}

export interface ProductsSliceState {
  items: Products[]
  status: Status
}

export type SearchProductsParams = {
  sortBy: string
  category: string
  order: string
  search: string
}
