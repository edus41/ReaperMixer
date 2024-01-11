import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../../utilities'
import { useDispatch } from 'react-redux'
import { setMode } from '../../redux'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function ModeButton({MODE, size}) {
  console.log('COMPONENTE ModeButton')
    
  const dispatch = useDispatch()

  const selectMode = (MODE) => {
    dispatch(setMode(MODE))
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={()=>{selectMode("OSC")}} style={[styles.midi, { height:size,width:size,backgroundColor: MODE === 'OSC' ? COLORS.Green : COLORS.Grey30 }]}>
        { MODE === "OSC"
          ? <MaterialCommunityIcons name="midi-port" size={size*0.7} color={COLORS.Black} />
          : <MaterialCommunityIcons name="midi-port" size={size*0.6} color={COLORS.GreyCC} />
        }
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={()=>{selectMode("MIXER")}} style={[styles.mixer, { height:size,width:size,backgroundColor: MODE === 'MIXER' ? COLORS.Green : COLORS.Grey30 }]}>
        { MODE === "MIXER"
          ? <Entypo name="sound-mix" size={size*0.7} color={COLORS.Black} />
          : <Entypo name="sound-mix" size={size*0.6} color={COLORS.GreyCC} />
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  midi: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
    borderStartWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GreyAA,
  },
  mixer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GreyAA,
  },
})

export default ModeButton
