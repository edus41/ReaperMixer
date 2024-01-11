import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../utilities'

export const styles = (orient, recvcnt) =>
  StyleSheet.create({
    container: {
      height: orient ? Dimensions.get('window').height - 120 : Dimensions.get('window').height - 60,
      width: '100%',
      backgroundColor: COLORS.Grey30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding:"0.5%",
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: recvcnt > 0 ? 'flex-start' : 'center',
      alignItems: 'center'
    },
    master: {
      height: '100%',
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    noTrackText: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#CCCCCC'
    }
  })
