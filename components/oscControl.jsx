import React, { useState } from 'react'
import { Text, View } from 'react-native'
import RadialSlider from './osd/radialSlider'
import ButtonOSD from './osd/buttonOsd'
import { useSelector, useDispatch } from 'react-redux'
import { sendOsc } from '../redux'
import { styles } from '../styles/osdPageStyles'
import { COLORS, getTextColor } from '../utilities'

export default function OSCControl({ x }) {
  const dispatch = useDispatch()

  const CONTROL = useSelector((state) => state.osdControls[x])
  const { type, mode, value, minValue, maxValue, color, name, steps, currentStep } = CONTROL || {}
  const orientation = useSelector((state) => state.orientation)

  const [heightDim, setHeight] = useState(0)
  const textColor = CONTROL?.steps?.[CONTROL?.currentStep]?.color
    ? getTextColor(CONTROL.steps[CONTROL.currentStep].color)
    : '#CCCCCC';

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout
    setHeight(height)
  }

  const onValueChange = (value, currentStep) => {
    dispatch(sendOsc([x, value, currentStep]))
  }

  return (
    <View onLayout={onLayout} style={styles(orientation).block}>
      {!CONTROL ? (
        <Text style={styles(orientation).emptyText}> EMPTY </Text>
      ) : type === 'KNOB' ? (
        <RadialSlider value={value} min={minValue} max={maxValue} onValueChange={onValueChange} color={color} name={name} size={heightDim} softness={10} />
      ) : (
        <ButtonOSD mode={mode} currentStep={currentStep} onValueChange={onValueChange} color={color} name={name} steps={steps} textColor={textColor} />
      )}
      <Text style={[styles().numberText, { color: type === 'BUTTON' ? textColor : COLORS.GreyAA }]}>{x + 1}</Text>
    </View>
  )
}
