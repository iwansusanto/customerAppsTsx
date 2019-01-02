import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/config/redux'
import NavigationApp from './src/config/navigation'

const App = () => {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationApp />
        </PersistGate>
    </Provider>
  )
}

export default App