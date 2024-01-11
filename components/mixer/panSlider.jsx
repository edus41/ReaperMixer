import React, { useState, useRef, useEffect } from 'react'
import { View, PanResponder, Text } from 'react-native'
import Svg, { Circle, Line, Rect } from 'react-native-svg'
import { mkpanstr } from '../../utilities'

function panToVal(val){
  return (((val*-1) + 1) / 2)
}

function valToPan(val){
  return ((2 * val - 1) * -1)
}

const PanSlider = ({ value, gestPresition, height, width, backgroundColor, fill, centerColor,centerWidth, textColor, textSize, onValueChange, onRelease, onPress, x}) => {

  console.log('COMPONENTE PanSlider', x)

  const [val, setVal] = useState(0.5)
  const [xPos, setXPos] = useState(0)
  const lastTapTimeRef = useRef(null)

  const HALF_WIDTH = width / 2

  useEffect(() => {
    const parsedValue = parseFloat(value)

    if (!isNaN(parsedValue) && parsedValue >= -1 && parsedValue <= 1) {
      const newVal = panToVal(parsedValue)
      setVal(newVal)
      setXPos(Math.min(width, Math.max(0, width - newVal * width)))
    }
  }, [value]);

  const panResponder = PanResponder.create({

    onStartShouldSetPanResponder: () => {
      onValueChange(valToPan(val), true)
      onPress && onPress()
    },

    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gestureState) => {
      const newVal = Math.max(0, Math.min(1, val - gestureState.dx / (gestPresition * width)))
      if (newVal !== val) {
        setVal(newVal)
        onValueChange(valToPan(newVal));
      }
      setXPos(Math.min(width, Math.max(0, width - newVal * width)));
    },

    onPanResponderRelease: (event, gestureState) => {
      const newVal = Math.max(0, Math.min(1, val - gestureState.dx / (gestPresition * width)))
      onValueChange(valToPan(newVal), false)
      onRelease && onRelease()

      if (lastTapTimeRef.current) {
        clearTimeout(lastTapTimeRef.current)
        lastTapTimeRef.current = null
        setVal(0.5)
        onValueChange(0)
        setXPos(HALF_WIDTH)
      } else {
        lastTapTimeRef.current = setTimeout(() => {
          lastTapTimeRef.current = null
        }, 300)
      }
    },
  })

  return (
    <Svg style={{ backgroundColor: backgroundColor, height: height, width: width, justifyContent: 'center' }}>
      <Rect x={HALF_WIDTH} y={0} width={xPos - HALF_WIDTH} height={height} fill={fill} />
      <Line y1={0} x1={HALF_WIDTH} y2={height} x2={HALF_WIDTH} stroke={centerColor} strokeWidth={centerWidth} />
      <Circle cx={HALF_WIDTH} cy={height / 2} r={height} fill="transparent" {...panResponder.panHandlers} />
      <View style={{ width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: textColor, textAlign: 'center', fontSize:textSize, fontWeight:"bold" }}>{mkpanstr((val * 2) - 1)}</Text>
      </View>
    </Svg>
  )
}

export default PanSlider
