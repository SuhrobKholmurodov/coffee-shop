import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layouts from './layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from './pages'
import { ProductDetails } from './pages/ProductDetails'

const App = () => {
  const [activeFirst, setActiveFirst] = useState(0)
  const [activeSecond, setActiveSecond] = useState(0)

  const handleChangeFirst = (index: number) => {
    setActiveFirst(index)
  }

  const handleChangeSecond = (index: number) => {
    setActiveSecond(index)
  }

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
          element: (
            <ProductDetails
              activeFirst={activeFirst}
              activeSecond={activeSecond}
              onChangeFirst={handleChangeFirst}
              onChangeSecond={handleChangeSecond}
            />
          )
        }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default App
