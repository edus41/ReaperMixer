import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux'
import AppContainer from './pages/mainPage'

import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
LogBox.ignoreAllLogs(true)

const App = () => {
  console.log('COMPONENTE App')

  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <StatusBar style="inverted" hidden={true} />
      <AppContainer />
    </Provider>
  )
}

export default App
