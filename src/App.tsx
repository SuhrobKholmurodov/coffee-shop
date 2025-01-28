import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layouts from './layouts/Layouts'
import { About, Cart, Contacts, Home, NotFound } from './pages'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layouts />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/contacts',
          element: <Contacts />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/cart',
          element: <Cart />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App
