import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layouts from './layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from './pages'
import { ProductDetails } from './pages/ProductDetails'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layouts />,
      children: [
        { index: true, element: <Home /> },
        { path: '/contacts', element: <Contacts /> },
        { path: '/about', element: <About /> },
        { path: '/cart', element: <Cart /> },
        {
          path: '/:category/:id',
          element: <ProductDetails />
        }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default App
