import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import About from './pages/About'
import Layouts from './layouts/Layouts'
import NotFound from './pages/NotFound'

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
