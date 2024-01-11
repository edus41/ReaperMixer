import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { COLORS } from '../../utilities'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { setLockScreen } from '../../redux'

const OrientationButton = ({size}) => {

  const dispatch = useDispatch()
  const lock = useSelector(state=>state.lockScreen)

  return (
    <View>
      <TouchableOpacity style={[styles.container,{height:size,width:size}]} onPress={() => dispatch(setLockScreen(!lock))}>
        {lock
          ? <MaterialCommunityIcons name="screen-rotation-lock" size={size*0.65} color={COLORS.Red} />
          : <MaterialCommunityIcons name="screen-rotation" size={size*0.65} color={COLORS.GreyCC} />
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GreyAA,
    backgroundColor: COLORS.Grey30
  },
})

export default OrientationButton
