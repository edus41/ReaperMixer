import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { COLORS } from '../../utilities'
import { FontAwesome } from '@expo/vector-icons';
import { setMode } from '../../redux'
import { useDispatch } from 'react-redux'

const HomeButton = ({size}) => {

  const dispatch=useDispatch()
  const openConfig=()=>{
    dispatch(setMode("HOME"))
  }

  return (
    <View>
      <TouchableOpacity style={[styles.container,{height:size,width:size}]} onPress={openConfig}>
        <FontAwesome name="home" size={size*0.65} color={COLORS.GreyCC} />
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
    borderColor: COLORS.GreyAA,
    backgroundColor: COLORS.Grey30
  },
})

export default HomeButton
