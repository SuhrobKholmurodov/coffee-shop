import { lazy, Suspense } from 'react'
import Layouts from './layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from './pages'
import { LoadingSpinner } from './components'

const ProductDetails = lazy(() => import('./pages/ProductDetails'))

export const Routes = [
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
