import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectFilter = (state: RootState) => state.filters
export const selectSearchValue = createSelector(
  (state: RootState) => state.filters.searchValue,
  searchValue => searchValue
)
