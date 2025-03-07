import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from './pages'
import { LoadingSpinner } from './components'

const ProductDetails = lazy(() => import('./pages/ProductDetails'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layouts />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'about', element: <About /> },
      { path: 'cart', element: <Cart /> },
      {
        path: ':category/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetails />
          </Suspense>
        )
      }
    ]
  },
  { path: '*', element: <NotFound /> }
]

export default routes
