import { LoadingSpinner } from '@/components'
import Layouts from '@/layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from '@/pages'
import { lazy, Suspense } from 'react'

const ProductDetails = lazy(() => import('@/pages/ProductDetails'))

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
