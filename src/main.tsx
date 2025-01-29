import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './redux/store'

const rootElem = document.getElementById('root')

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
