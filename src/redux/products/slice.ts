import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products, ProductsSliceState, Status } from './types'
import { fetchProducts } from '@/services/productsApi'

const initialState: ProductsSliceState = {
  items: [],
  status: Status.LOADING,
  searchValue: '',  
  categoryId: 0     
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems (state, action: PayloadAction<Products[]>) {
      state.items = action.payload
    },
    setSearchValue (state, action: PayloadAction<string>) {
      state.searchValue = action.payload  
    },
    setCategoryId (state, action: PayloadAction<number>) {
      state.categoryId = action.payload  
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

export const { setItems, setSearchValue, setCategoryId } = ProductsSlice.actions

export default ProductsSlice.reducer
