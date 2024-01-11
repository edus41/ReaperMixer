import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../utilities'

export const styles = (orient) =>
  StyleSheet.create({
    container: {
      flexDirection: orient ? 'column' : 'row',
      width: '100%',
      height: orient ? 120 : 60,
      backgroundColor: COLORS.Grey40,
      justifyContent: orient ? "space-evenly" : "flex-start",
      alignItems: 'center'
    },
    firstRow: {
      flexDirection: 'row',
      height: 50,
      width: orient ? Dimensions.get('window').width : "55%",
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 10
    },
    buttonCointainer: {
      flexDirection: 'row',
      height: 50,
      width: 230,
      justifyContent: "space-evenly",
      alignItems: 'center',
      borderRadius: 10
    },
    secondRow: {
      flexDirection: 'row',
      height: 50,
      width: orient ? Dimensions.get('window').width : "45%",
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 10
    }
  })
