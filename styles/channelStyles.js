import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../utilities'

export const styles = (orient) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 2,
      marginLeft: 2,
      marginRight: 2
    },
    name: {
      height: orient ? '7%' : '10%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    pan: {
      height: orient ? '5%' : '10%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    mute: {
      height: orient ? '8%' : '15%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    fader: {
      flexDirection: 'row',
      height: orient ? '77%' : '60%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    value: {
      height: orient ? '3%' : '5%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    nameText: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#CCCCCC'
    },
    valText: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })
