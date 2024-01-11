import { StyleSheet,Dimensions } from 'react-native'
import { COLORS } from '../utilities'

export const styles=(orient) => StyleSheet.create({
    container: {
        height: 40,
        width:350,
        justifyContent: 'center',
        alignItems: 'center',
      },
      touchable: {
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelText: {
        height:40,
        width: 50,
        textAlign: 'center',
        fontSize: 8,
        color: COLORS.GreyAA,
        fontWeight: 'bold',
        backgroundColor:COLORS.Grey30,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderWidth: 1,
        borderRightWidth:0,
        paddingTop:9,
        borderColor: COLORS.GreyAA,
      },
      nameText: {
        height:40,
        width: orient?250:200,
        textAlign: 'center',
        fontSize: 10,
        color: COLORS.Grey20,
        fontWeight: 'bold',
        backgroundColor:COLORS.Grey30,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderWidth: 1,
        paddingTop:11,
        borderColor: COLORS.GreyAA,
      },
});
