import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
import './i18n/index'

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper
