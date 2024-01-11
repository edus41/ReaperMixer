import React, { useState, useEffect, useRef } from 'react'
import { View, PanResponder, Text } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { colorWithAlpha, getTextColor } from '../../utilities'

const RadialSlider = ({ min = 0, max = 100, size = 100, color = '#FF0000', valueColor = '#FFFFFF', borderSize = 2, value = 50, steps = 1, softness = 1, name = 'KNOB', onValueChange }) => {
  console.log('COMPONENTE RadialSlider')
  const [sliderValue, setSliderValue] = useState(0)

  const HEIGHT = size * 0.8
  const COLOR_ALPHA = colorWithAlpha(color, 0.3)
  const TEXT_COLOR = "white"//getTextColor(color)

  const lastTapTimeRef = useRef(null)

  useEffect(() => {
    const initValue = ((value - min) / (max - min)) * 50
    setSliderValue(initValue)
  }, [value])

  const handlePanResponderMove = (_, gestureState) => {
    const { dy } = gestureState
    const newValue = Math.min(50, Math.max(0, sliderValue - dy / softness))

    if (newValue !== sliderValue) {
      setSliderValue(newValue)
      let valorMapeado = min + ((newValue - 0) / 50) * (max - min)
      if (steps > 0) {
        valorMapeado = Math.round(valorMapeado / steps) * steps
      }
      onValueChange(valorMapeado)
    }
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: (event, gestureState) => {
      if (lastTapTimeRef.current) {
        clearTimeout(lastTapTimeRef.current)
        lastTapTimeRef.current = null
        const resetVal = ((value - min) / (max - min)) * 50
        setSliderValue(resetVal)
        let valorMapeado = min + ((resetVal - 0) / 50) * (max - min)
        if (steps > 0) {
          valorMapeado = Math.round(valorMapeado / steps) * steps
        }
        onValueChange(valorMapeado)
      } else {
        lastTapTimeRef.current = setTimeout(() => {
          lastTapTimeRef.current = null
        }, 300)
      }
    }
  })

  return (
    <View style={{ width: HEIGHT, height: HEIGHT }}>
      
      <View style={{ position: 'absolute', top: -HEIGHT*0.06, width: size*0.8 , height: HEIGHT, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: HEIGHT * 0.28, color: valueColor, fontWeight: 'bold' }}>{value}</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          top: HEIGHT - HEIGHT * 0.05,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: HEIGHT * 0.08,
          borderColor: color,
          borderWidth: 1,
          backgroundColor: COLOR_ALPHA
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: HEIGHT * 0.16, color: TEXT_COLOR, fontWeight: 'bold' }}>{name}</Text>
      </View>

      <View style={{ position: 'absolute', left: -HEIGHT*0.1 , top:-HEIGHT*0.12, transform: [{ rotate: '35deg' }] }} {...panResponder.panHandlers}>
        <Svg width={HEIGHT * 1.2} height={HEIGHT * 1.2} viewBox="0 0 30 30">
          <Path d={`M15 25 a 10 10 0 0 1 0 -20 a 10 10 0 0 1 0 20`} fill="none" stroke={color} strokeWidth={borderSize} strokeLinecap="round" strokeDasharray={`${sliderValue}, 100`} />
          <Path d={`M15 25 a 10 10 0 0 1 0 -20 a 10 10 0 0 1 0 20`} fill="none" stroke={COLOR_ALPHA} strokeWidth={borderSize + 1} strokeLinecap="round" strokeDasharray="50, 100" />
        </Svg>
      </View>
    </View>
  )
}

export default RadialSlider
