import React from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMix } from '../../redux';
import { COLORS, getTextColor } from '../../utilities';
import { Foundation } from '@expo/vector-icons';

function MixModal({ isModal, setModal }) {

  console.log('COMPONENTE MixModal')

  const dispatch = useDispatch()
  const mixes = useSelector((state)=>state.mixes)
  const orientation = useSelector((state)=>state.orientation)

  const selectMix = (trackId)=>{
    dispatch(setMix(trackId))
    setModal()
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isModal}>
      <TouchableOpacity activeOpacity={1} onPress={setModal} style={{ width: '100%', height: '100%', backgroundColor: '#25252500', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.window}>
          <ScrollView contentContainerStyle={styles.scrollCointainer}>
            <View>
              <Text style={styles.titleText}>--- SELECT A MIX ---</Text>
            </View>
            {mixes.map((mix, index) => (
              mix.recvcnt>0 || mix.name === "MASTER" ?
              <TouchableOpacity key={index} onPress={()=>selectMix(mix.trackId)} style={[styles.button,{backgroundColor:mix.color}]}>
                <Text style={[styles.nameText, { color: getTextColor(mix.color), fontSize:mix.name.length<18?14:12}]}>{mix.name}</Text>
                { mix.hwocnt == 0 ?
                  <View style={styles.alert}>
                    <Foundation name="alert" size={12} color={COLORS.Yellow} />
                    <Text style={styles.alertText}>NO HARDWARE OUTPUT</Text>
                    <Foundation name="alert" size={12} color={COLORS.Yellow} />
                  </View>
                  : null
                }
              </TouchableOpacity>
              :
              null
            ))}
          </ScrollView>
          </View>
        </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollCointainer:{
    width:330, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor:"#353535", 
    padding:15,
    borderRadius:10
  },
  window:{
    width:330, 
    height:"80%"
  },
  button:{
    flexDirection:"row",
    height: 40, 
    width: 300, 
    borderWidth: 1, 
    borderColor: '#202020', 
    borderRadius: 5, 
    justifyContent: "space-between", 
    alignItems:"center",
    marginTop: 5,
    paddingLeft:10,
    paddingRight:10
  },
  alert:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    height:"50%",
    width:150,
    backgroundColor:"#353535",
    borderRadius:5
  },
  nameText:{
    fontWeight:"bold",
    maxWidth:120,
  },
  titleText:{
    textAlign:"center",
    fontSize:12,
    color:"#CCCCCC",
  },
  alertText:{
    textAlign:"center",
    fontSize:10,
    fontStyle: 'italic',
    color:"#AAAAAA"
  }
});

export default MixModal