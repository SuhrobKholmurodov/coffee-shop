const apiUrl = import.meta.env.VITE_API_URL
import { Products, SearchProductsParams } from '@/redux/products/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { pickBy } from 'lodash'
import identity from 'lodash/identity'

export const fetchProducts = createAsyncThunk<Products[], SearchProductsParams>(
  'products/fetchProductsStatus',
  async params => {
    const { sortBy, order, category, search } = params
    const { data } = await axios.get<Products[]>(`${apiUrl}`, {
      params: pickBy(
        {
          category,
          sortBy,
          order,
          search
        },
        identity
      )
    })
    return data
  }
)
