import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { COLORS } from '../utilities'
import { useDispatch, useSelector } from 'react-redux'
import { popError } from '../redux'

const calculateTimeout = (messageLength) => {
  switch (true) {
    case messageLength < 10:
      return 1500;
    case messageLength < 20:
      return 2000;
    case messageLength < 30:
      return 3000;
    case messageLength < 40:
      return 4000;
    default:
      return 5000;
  }
}


export default function AlertLabel() {
  console.log("COMPONENTE AlertLabel")
  const dispatch = useDispatch()
  const [MSG,COLOR] = useSelector(state => state.alert)
  const TIME = calculateTimeout(MSG?.length)

  useEffect(() => {
    const eraseError = () => {
      if (MSG) {
        setTimeout(() => {
          dispatch(popError(false))
        }, TIME)
      }
    }
    eraseError()
    return () => clearTimeout(eraseError)
  }, [MSG])

  return MSG ? (
    <Modal 
      animationType="slide" 
      hideModalContentWhileAnimating={true}
      transparent={true} 
      visible={MSG?true:false}
      >
      <View style={styles.container}>
        <Text
          style={[
            styles.errorText,
            { borderColor: COLOR },
          ]}
        >
          {MSG}
        </Text>
      </View>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '3%',
    right:0,
    left:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.White,
    backgroundColor: COLORS.Grey40,
    paddingTop: 5,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 12,
    fontWeight:"bold"
  },
});
