import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './redux/store'
import { Toaster } from 'react-hot-toast'

const rootElem = document.getElementById('root')

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)

  root.render(
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  )
}
