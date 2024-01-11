import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../utilities'

export const styles = (orient) =>
  StyleSheet.create({
    container: {
      height: orient ? Dimensions.get('window').height - 120 : Dimensions.get('window').height - 60,
      width: '100%',
      backgroundColor: COLORS.Grey30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    blockContainer: {
      height: orient ? '12.5%' : '25%',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row'
    },
    block: {
      height: '100%',
      width: orient ? '26%' : '13%',
      justifyContent: 'center',
      alignItems:"center"
    },
    emptyText: {
      height: '75%',
      width: '75%',
      color: '#AAAAAA',
      textAlign: 'center',
      fontSize: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.Grey90,
      borderStyle: 'dashed',
      paddingTop:18,
    },
    button: {
      height: '100%',
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      fontSize: 12 
    },
    buttonText: {
      textTransform:"uppercase",
      textAlign: 'center',
      fontSize: 12 
    },
    numberText: {
      position:"absolute",
      top:"15%",
      right:"18%",
      fontSize: 9 
    },
  })
