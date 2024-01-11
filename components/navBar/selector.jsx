import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import MixModal from './mixModal'
import { styles } from '../../styles/selectorStyles'
import { getTextColor } from '../../utilities'

function Selector({ MODE, orientation }) {
  console.log('COMPONENTE MixSelect')

  const [showModal, setShowModal] = useState(false)

  const masterID = useSelector((state) => state.selectedMix)
  const deviceName = useSelector((state) => state.conn.name)
  const mix = useSelector((state) => state.mixes[masterID])

  if (!mix) {
    dispatch(setMix(0))
    return null
  }

  const { name, color } = mix

  const showModalChange = () => {
    setShowModal(!showModal)
  }

  return (
    <View style={styles().container}>
      <TouchableOpacity disabled={MODE == 'MIXER' ? false : true} onPress={showModalChange} style={styles().touchable}>
        <Text style={styles().labelText}>{MODE == 'MIXER' ? "MIX SELECTED" : 'DEVICE NAME'}</Text>
         {MODE == 'MIXER' 
          ? <Text style={[styles(orientation).nameText, { backgroundColor:color, color: getTextColor(color), fontSize: name.length < 18 ? 13 : 11 }]}>{name}</Text>
          : <Text style={[styles(orientation).nameText, { fontSize: deviceName.length < 18 ? 13 : 11, backgroundColor: MODE == 'MIXER' ? color : '#CCCCCC'  }]}>{deviceName}</Text>}
      </TouchableOpacity>
      {showModal && MODE == 'MIXER' ? <MixModal isModal={showModal} setModal={showModalChange} /> : null}
    </View>
  )
}

export default Selector
