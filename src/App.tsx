import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Routes } from './routes'

const router = createBrowserRouter(Routes)

const App = () => <RouterProvider router={router} />

export default App
