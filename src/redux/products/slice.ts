import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProducts } from './asyncActions'
import { Products, ProductsSliceState, Status } from './types'

const initialState: ProductsSliceState = {
  items: [],
  status: Status.LOADING
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems (state, action: PayloadAction<Products[]>) {
      state.items = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.status = Status.LOADING
      state.items = []
      console.log("Fetching products..."); 
    })

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
      console.log("Products fetched successfully:", action.payload);
    })

    builder.addCase(fetchProducts.rejected, state => {
      state.status = Status.ERROR
      state.items = []
      console.error("Error fetching products.");
    })
  }
})

export const { setItems } = ProductsSlice.actions

export default ProductsSlice.reducer
