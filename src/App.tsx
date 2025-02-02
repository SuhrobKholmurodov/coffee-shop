import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { About, Cart, Contacts, Home, NotFound } from './pages'
import { lazy, Suspense } from 'react'
import 'animate.css';
import Layouts from './layouts/Layouts';

const ProductDetails = lazy(() => import('./pages/ProductDetails'))

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
          element: (
            <Suspense fallback={<div className='text-center'>Загрузка...</div>}>
              <ProductDetails />
            </Suspense>
          )
        }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default App
