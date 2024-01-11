import { StyleSheet } from 'react-native'
import { COLORS } from '../utilities'

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#151515',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding:"2%"
  },

  logo: {
    height:"90%",
    resizeMode: 'contain',    
  },

  configContainer: {
    width:"80%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  firstRow: {
    width: '100%',
    aspectRatio:"8/1",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: "3%",
  },

  modeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },

  mixerButton: {
    height:"100%",
    aspectRatio:"1/1",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: COLORS.GreyAA,
    borderColor: COLORS.Black,
    marginLeft:"3%"
  },

  oscButton: {
    height:"100%",
    aspectRatio:"1/1",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: COLORS.GreyAA,
    borderColor: COLORS.Black
  },

  nameContainer: {
    width:"100%",
    aspectRatio:"8/1",
    flexDirection: 'row',
    marginBottom: "3%",
    borderWidth: 1,
  },

  nameLabelContainer: {
    width: '20%',
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.Red
  },

  nameText: {
    fontSize: 9,
    textAlign: 'center',
    color: '#909090',
    fontWeight: 'bold'
  },

  inputName: {
    width: '80%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: COLORS.Red
  },

  adressContainer: {
    width: '100%',
    aspectRatio:"8/1",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: "3%"
  },

  inputIP: {
    width: '73%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: COLORS.Red
  },

  inputPort: {
    width: '25%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: COLORS.Red
  },

  inputUser: {
    width: '100%',
    aspectRatio:"8/1",
    backgroundColor: COLORS.GreyCC,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: "3%",
    borderWidth: 2,
    borderColor: COLORS.Grey80
  },

  passwordContainer: {
    flexDirection: 'row',
    width:"100%",
    aspectRatio:"8/1",
    marginBottom: "3%",
  },

  inputPassword: {
    width: '80%',
    backgroundColor: COLORS.GreyCC,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingLeft: 10,
    borderWidth: 2,
    borderRightWidth: 0,
    borderColor: COLORS.Grey80
  },

  passwordButton: {
    width: '20%',
    backgroundColor: '#303030',
    fontSize: 9,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.Grey80
  },

  paswordButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#909090',
    fontWeight: 'bold'
  },

  buttonsContainer: {
    width: '100%',
    aspectRatio:"8/1",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: '100%',
    width: '30%',
    backgroundColor: COLORS.Red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
})
