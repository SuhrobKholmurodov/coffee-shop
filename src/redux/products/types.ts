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
  category: number
  order: string
  search: string
}
