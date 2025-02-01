import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId (state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue (state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    }
  }
})

export const { setCategoryId, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
