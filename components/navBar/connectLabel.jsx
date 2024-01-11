import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet,Text } from 'react-native'
import { COLORS } from '../../utilities'
import { useSelector } from 'react-redux'
import { Fontisto } from '@expo/vector-icons';

const ConnectLabel = ({backgroundColor, height,width}) => {

    const status = useSelector((state) => state.conn.status)
    const [blink, setBlink] = useState(true)
    const intervalRef = useRef(null)
  
    useEffect(() => {
      return () => {
        clearInterval(intervalRef.current)
      }
    }, [])
  
    useEffect(() => {
      if (status) {
        intervalRef.current = setInterval(() => {
          setBlink((prevIsConnectModal) => !prevIsConnectModal)
        }, 300)
      } else {
        clearInterval(intervalRef.current)
      }
      return () => {
        clearInterval(intervalRef.current)
      }
    }, [status])

    return (
        <View style={[styles.container,{backgroundColor:backgroundColor, borderColor:status ? COLORS.Green50 : COLORS.Red50, height:height,width:width}]}>
            <Fontisto name="world" size={10} color={status ? blink ? COLORS.Green50 : COLORS.Green : COLORS.Red} marginLeft={6} />
            <Text style={[styles.text, { color: status ? COLORS.Green :  COLORS.Red }]}>{status?"ONLINE":"OFFLINE"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      borderWidth: 1,
      flexDirection:"row",
      justifyContent:"space-evenly"
    },
    text:{
      fontSize:10,
      color:"white",
      marginLeft:6,
      marginRight:6,
      fontWeight:"bold"
    }
  });

  export default ConnectLabel