import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../utilities'
import { sendValue,setIsSending } from '../../redux'

function MuteButton({ x, color, mute }) {
  console.log('COMPONENTE MuteCh', x)

  const dispatch = useDispatch()
  const muteColor = mute ? "#FF0000" : COLORS.GreyAA 
  
  const setMute = async () => {
    const value = mute ? 0 : 1

    dispatch(sendValue({ x, value, type: "MUTE" }))
    dispatch(setIsSending(false))
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={setMute} style={[styles.button, { backgroundColor: muteColor }]}>
      <Text style={[styles.text,{ color: muteColor === "#FF0000" ? COLORS.White : COLORS.Grey20}]}>MUTE</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: '65%',
    width: '90%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: COLORS.Grey40,
  },
  text: {
    fontWeight: 'bold',
    fontSize:10,
  },
});

export default MuteButton
