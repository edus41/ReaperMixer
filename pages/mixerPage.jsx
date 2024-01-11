import { View, ScrollView, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Channel from '../components/mixer/channel'
import { styles } from '../styles/mixerPageStyles'
import { colorWithAlpha } from '../utilities'

const Mixer = () => {
  console.log('COMPONENTE Mixer')
  const selectedMixId = useSelector((state) => state.selectedMix)
  const mix = useSelector((state) => state.mixes[selectedMixId])
  const orientation = useSelector((state) => state.orientation)

  return (
    <View style={styles(orientation).container}>
      <ScrollView horizontal={true} contentContainerStyle={styles(orientation,mix?.recvcnt).scrollView}>
        { mix?.recvcnt > 0 
          ? Array.from({ length: mix?.recvcnt }, (_, index) => <Channel key={index} x={index} selectedMixId={selectedMixId} CHANNEL_DATA={mix?.recvs[index]} />) 
          : <Text style={styles().noTrackText}>... NO TRACKS FOUND ...</Text>
        }
      </ScrollView>
      <View style={[styles().master, {backgroundColor:colorWithAlpha(mix.color,0.3)}]}>
        <Channel x={'MASTER'} selectedMixId={selectedMixId} CHANNEL_DATA={mix} />
      </View>
    </View>
  )
}

export default Mixer
