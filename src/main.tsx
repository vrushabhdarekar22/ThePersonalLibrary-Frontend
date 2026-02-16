import React from 'react'
import ReactDOM from 'react-dom/client' 
import { Provider } from 'react-redux' //it basically for redux connect to react
import { store } from './app/store'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element') //for type safety rootElement can be null
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/**Makes store accessible in all components => now we cna use useSelector() and useDispatch()*/}
    <Provider store={store}> 
      <App />
    </Provider>

  </React.StrictMode>
)
