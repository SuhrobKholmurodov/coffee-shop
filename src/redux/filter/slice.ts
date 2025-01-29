import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { categoryId: number } = {
  categoryId: 0
}

const filterSlice = createSlice({
  name: 'filters', 
  initialState,
  reducers: {
    setCategoryId (state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    }
  }
})

export const { setCategoryId } = filterSlice.actions
export default filterSlice.reducer
