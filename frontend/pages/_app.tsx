import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../public/static/fonts/style.css'
import { Provider } from 'react-redux'
import store from 'store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
  )
}

export default MyApp
