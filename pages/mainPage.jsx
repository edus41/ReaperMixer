import { View } from 'react-native'
import { useSelector } from 'react-redux'
import AlertLabel from '../components/alertLabel'
import ConfigPage from './configPage'
import OrientationHandler from '../components/orientationHandler'
import FetchData from '../components/fetchData'
import NavBar from '../components/navBar'
import Mixer from './mixerPage'
import OSCPage from './oscPage'

const AppContainer = () => {
  console.log('COMPONENTE Home')

  const mode = useSelector((state) => state.mode)

  return (
    <View style={{flex:1}}>
      <FetchData />
      <OrientationHandler/>
      { mode === 'HOME' 
        ? <ConfigPage />
        : <>
            <NavBar MODE={mode} />
            {mode == 'MIXER' ? <Mixer /> : <OSCPage />} 
          </>
      }
      <AlertLabel />
    </View>
  )
}

export default AppContainer
