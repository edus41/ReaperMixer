import { View } from 'react-native'
import { COLORS } from '../utilities'
import ModeButton from './navBar/modeButton'
import Selector from './navBar/selector'
import HomeButton from './navBar/homeButton'
import OrientationButton from './navBar/orientationButton'
import ConnectLabel from './navBar/connectLabel'
import { useSelector } from 'react-redux'
import SettingsButton from './navBar/settingsButton'
import { styles } from '../styles/navBarStyles'

function NavBar({ MODE }) {
  console.log('COMPONENTE NavBar')

  const orientation = useSelector((state) => state.orientation)

  return (
    <View style={styles(orientation).container}>
      <View style={styles(orientation).firstRow}>
      <ConnectLabel backgroundColor={COLORS.Grey30} height={30} width={80} />
        <View style={styles(orientation).buttonCointainer}>
          <HomeButton size={40} />
          <SettingsButton size={40} />
          <OrientationButton size={40} />
          <ModeButton MODE={MODE} size={40} />
        </View>
      </View>

      <View style={styles(orientation).secondRow}>
        <Selector MODE={MODE} orientation={orientation} />
      </View>
    </View>
  )
}

export default NavBar
