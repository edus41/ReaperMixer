import React, { useCallback } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { colorWithAlpha, getTextColor, mkvolstr } from '../../utilities'
import { useDispatch, useSelector } from 'react-redux'
import { sendValue } from '../../redux'

import MuteButton from './muteButton'
import LogSlider from './logSlider'
import PanSlider from './panSlider'
import { styles } from '../../styles/channelStyles'

const Channel = ({ x, selectedMixId, CHANNEL_DATA }) => {
  console.log('COMPONENTE Channel', x)

  const dispatch = useDispatch()
  const orientation = useSelector((state) => state.orientation)
  
  const height =Dimensions.get("window").height * 0.8
  
  if (!CHANNEL_DATA) {
    return null
  }

  const { color, name, pan, mute, value } = CHANNEL_DATA

  const MUTED_COLOR = !mute ? color : '#999999'
  const MUTED_COLOR_ALPHA = !mute ? colorWithAlpha(color, 0.3) : '#AAAAAA80'
  const TEXT_COLOR = color ? getTextColor(MUTED_COLOR) : '#202020'

  const onFaderChange = useCallback(
    (newValue, isSending) => {
      dispatch(sendValue({ x, value: newValue, isSending, type: 'VOL' }))
    },
    [dispatch, x]
  )

  const onPanChange = useCallback(
    (newValue, isSending) => {
      dispatch(sendValue({ x, value: newValue, isSending, type: 'PAN' }))
    },
    [dispatch, x]
  )

  return (
    <View style={[styles(orientation).container, { borderColor: MUTED_COLOR, backgroundColor: MUTED_COLOR_ALPHA }]}>
      <View style={[styles(orientation).name, { backgroundColor: MUTED_COLOR }]}>
        <Text style={[styles(orientation).nameText, { color: !mute ? TEXT_COLOR : '#CCCCCC' }]}>{name}</Text>
      </View>

      <View style={styles(orientation).pan}>
        <PanSlider 
          value={pan} 
          onValueChange={onPanChange} 
          height={orientation?height*0.05:height*0.10} 
          width={60} 
          backgroundColor={MUTED_COLOR_ALPHA} 
          gestPresition={4} 
          fill={MUTED_COLOR} 
          centerColor="#CCCCCC" 
          centerWidth={1} 
          textColor={TEXT_COLOR} 
          textSize={12} x={x} 
        />
      </View>

      <View style={[styles(orientation).mute, { backgroundColor: MUTED_COLOR_ALPHA }]}>
        <MuteButton x={x} color={color} mute={mute} />
      </View>

      <View style={styles(orientation).fader}>
        <LogSlider
          value={value}
          onValueChange={onFaderChange}
          height={orientation?height*0.8:height*0.6}
          width={60}
          backgroundColor="transparent"
          maxTrackBorderColor="black"
          maxTrackColor="black"
          minTrackBorderColor={MUTED_COLOR}
          minTrackColor={MUTED_COLOR}
          borderTrackWidth={1}
          gestPresition={1}
          trackWidth={4}
          thumbHeight={55}
          thumbWidth={25}
          fadderPadding={10}
          isMuted={mute}
          x={x}
        />
      </View>

      <View style={[styles(orientation).value, { backgroundColor: MUTED_COLOR }]}>
        <Text style={[styles(orientation).valText, { color: !mute ? TEXT_COLOR : '#CCCCCC' }]}>{mkvolstr(value)}</Text>
      </View>
    </View>
  )
}

export default Channel
