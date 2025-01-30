import { configureStore } from '@reduxjs/toolkit'
import products from './products/slice'
import filters from './filter/slice'
import cart from './cart/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    products,
    filters,
    cart
  }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
