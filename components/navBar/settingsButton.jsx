import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { COLORS } from '../../utilities'
import { Ionicons } from '@expo/vector-icons';
import { setMode } from '../../redux'
import { useDispatch } from 'react-redux'

const SettingsButton = ({size}) => {

  const dispatch = useDispatch()
  const openSettings=()=>{
    dispatch(setMode("SETTINGS"))
  }

  return (
    <View>
      <TouchableOpacity disabled={true} style={[styles.container,{height:size,width:size}]} onPress={openSettings}>
        <Ionicons name="settings-sharp" size={size*0.65} color={COLORS.Grey90} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.Grey90,
    backgroundColor: COLORS.Grey80
  },
})

export default SettingsButton
