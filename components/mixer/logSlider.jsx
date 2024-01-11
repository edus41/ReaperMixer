import React, { useState,useRef, useEffect } from 'react'
import { View, PanResponder, Image } from 'react-native'
import Svg, { Circle, Line,Rect } from 'react-native-svg'
import { IMG } from '../../utilities'

function valToLog(val){
  return (Math.pow(val, 4) * 4).toFixed(6)
}

function LogToVal(val){
  return (Math.pow(val / 4, 1/4))
}

const LogSlider =({ 
    value, gestPresition, width, height, backgroundColor, maxTrackColor, minTrackColor, minTrackBorderColor, maxTrackBorderColor, borderTrackWidth,
    trackWidth, thumbWidth, thumbHeight, fadderPadding, isMuted,
    onValueChange, onRelease, onPress, x
}) => {

  console.log("COMPONENTE LogSlider", x)

  const faderHeight = height - thumbHeight - fadderPadding
  
  const halfWidth = width / 2
  const oneThirdsWidth = width / 3
  const twoThirdsWidth = 2 * width / 3
  const oneFourthsWidth = width / 4

  const [val, setVal] = useState(LogToVal(value))
  const [ypos, setYPos] = useState(faderHeight * 0.29)
  const lastTapTimeRef = useRef(null)

  useEffect(()=>{
    if (value >= 0 && value <= 4) {
      const newVal = LogToVal(value)
      setVal(newVal)
      setYPos(Math.min(faderHeight, Math.max(0, faderHeight - newVal * faderHeight)))
    } else {
      setYPos(faderHeight * 0.29)
    }
  },[value])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      onValueChange(valToLog(val), true)
      onPress && onPress()
      return true;
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
        const newVal = (Math.max(0, Math.min(1, val - gestureState.dy / (gestPresition * height))))
        if(newVal!=val){
          setVal(newVal)
          setYPos(Math.min(faderHeight, Math.max(0, faderHeight - newVal * faderHeight)))
          onValueChange(valToLog(newVal))
        }
    },
    onPanResponderRelease: (event, gestureState) => {
      const newVal = (Math.max(0, Math.min(1, val - gestureState.dy / (gestPresition * height))))
      onValueChange(valToLog(newVal), false)
        onRelease && onRelease()
        if (lastTapTimeRef.current) {
          clearTimeout(lastTapTimeRef.current)
          lastTapTimeRef.current = null
          setVal(0.7071067)
          setYPos(faderHeight * 0.29)
          onValueChange(1, false)
        } else {
          lastTapTimeRef.current = setTimeout(() => {
            lastTapTimeRef.current = null
          }, 300)
        }
      },
  })  

  return (
    <View style={{backgroundColor, height:height, width:width}}>
          <Svg style={{ position: "absolute" }}>
            <Rect
              x={halfWidth-(trackWidth-borderTrackWidth)/2}
              y={fadderPadding}
              width={trackWidth-borderTrackWidth}
              height={ypos}
              fill={maxTrackColor}
              stroke={maxTrackBorderColor}
              strokeWidth={borderTrackWidth}
            />
            <Rect
              x={halfWidth-(trackWidth-borderTrackWidth)/2}
              y={ypos+thumbHeight/2}
              width={trackWidth-borderTrackWidth}
              height={height-(ypos+thumbHeight/2)-fadderPadding}
              fill={minTrackColor}
              stroke={minTrackBorderColor}
              strokeWidth={borderTrackWidth}
            />
          </Svg>

        <Svg style={{position:"absolute",top:((height-faderHeight)/2),backgroundColor:"transparent", height:faderHeight, width:width}}>

            <Line x1={oneFourthsWidth} y1={faderHeight * 0}x2={width-oneFourthsWidth} y2={faderHeight * 0} stroke="black" strokeWidth={1.8} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.1} x2={twoThirdsWidth} y2={faderHeight * 0.1} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.2} x2={twoThirdsWidth} y2={faderHeight * 0.2} stroke="black" strokeWidth={1.5} />
            <Line x1={width / 6} y1={faderHeight * 0.29}x2={width-width/6} y2={faderHeight * 0.29} stroke="black" strokeWidth={1.8} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.4} x2={twoThirdsWidth} y2={faderHeight * 0.4} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.5} x2={twoThirdsWidth} y2={faderHeight * 0.5} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.6} x2={twoThirdsWidth} y2={faderHeight * 0.6} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.7} x2={twoThirdsWidth} y2={faderHeight * 0.7} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.8} x2={twoThirdsWidth} y2={faderHeight * 0.8} stroke="black" strokeWidth={1.5} />
            <Line x1={oneThirdsWidth} y1={faderHeight * 0.9} x2={twoThirdsWidth} y2={faderHeight * 0.9} stroke="black" strokeWidth={1.5} />
            <Line x1={oneFourthsWidth} y1={faderHeight}x2={width-oneFourthsWidth} y2={faderHeight * 1} stroke="black" strokeWidth={4} />

            <Circle cx={halfWidth} cy={ypos} r={thumbWidth>thumbHeight?thumbWidth:thumbHeight} fill="transparent" {...panResponder.panHandlers} />
            <View style={{ position: 'absolute', top: ypos - thumbHeight/2, left: halfWidth - thumbWidth/2, width: thumbWidth, height: thumbHeight }}>
              <Image y={ypos} source={isMuted ? IMG.MuteFader : IMG.Fader} style={{height:"100%",width:"100%", opacity:0.9 }}/>
            </View>
        </Svg>
        
    </View>
  )
}

export default LogSlider
