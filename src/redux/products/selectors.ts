import { RootState } from '../store'

export const selectProduct = (state: RootState) => state.products

export const selectSearchValue = (state: RootState) => state.products.searchValue
export const selectCategoryId = (state: RootState) => state.products.categoryId
