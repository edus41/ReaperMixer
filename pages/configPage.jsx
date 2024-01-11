import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS, IMG } from '../utilities'
import { setConnValues, setLockScreen, setMode } from '../redux'
import { useState, useEffect } from 'react'
import ConnectLabel from '../components/navBar/connectLabel'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../styles/configPageStyles'

const ConfigPage = () => {
  console.log('COMPONENTE Home')

  const dispatch = useDispatch()

  const conn = useSelector((state) => state.conn)

  const [ip, setIp] = useState(conn.ip)
  const [port, setPort] = useState(conn.port)
  const [user, setUser] = useState(conn.user)
  const [pass, setPass] = useState(conn.pass)
  const [name, setName] = useState(conn.name)
  const [keyboardStatus, setKeyboardStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    })
    console.log(keyboardStatus)
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handelSetConnValues = () => {
    const defaultValues = { ip: '192.168.0.32', port: '9000', name: 'ANDROID_DEVICE' }

    dispatch(
      setConnValues({
        ip: ip ? ip : defaultValues.ip,
        port: port ? port : defaultValues.port,
        user,
        pass,
        name: name ? name : defaultValues.name
      })
    )
  }

  const setDefaultValues = () => {
    setIp(conn.ip)
    setPort(conn.port)
    setUser(conn.user)
    setPass(conn.pass)
    setName(conn.name)
  }

  const clearAll = () => {
    setIp(false)
    setPort(false)
    setUser(false)
    setPass(false)
    setName(false)
  }

  const changeMode = (mode) => {
    dispatch(setMode(mode))
    dispatch(setLockScreen(false))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        { !keyboardStatus 
          ? <View style={styles.logoContainer}>
              <Image style={styles.logo} source={IMG.FullScreen} />
            </View>
          : null
        }
        <View style={[styles.configContainer, { height: !keyboardStatus ? '50%' : '100%' }]}>
          <View style={styles.firstRow}>
            <ConnectLabel backgroundColor={'transparent'} borderColor={'transparent'} />
            <View style={styles.modeButtonContainer}>
              <TouchableOpacity style={styles.oscButton} onPress={() => { changeMode('OSC')}}>
                <MaterialCommunityIcons name="midi-port" size={25} color={COLORS.Black} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.mixerButton} onPress={() => { changeMode('MIXER') }} >
                <Entypo name="sound-mix" size={25} color={COLORS.Black} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.nameLabelContainer}>
              <Text style={styles.nameText}>DEVICE</Text>
              <Text style={styles.nameText}>NAME</Text>
            </View>
            <TextInput style={styles.inputName} placeholder="NAME" value={name} onChangeText={(text) => setName(text)} />
          </View>

          <View style={styles.adressContainer}>
            <TextInput style={styles.inputIP} placeholder="IP" value={ip} onChangeText={(text) => setIp(text)} />
            <TextInput style={styles.inputPort} placeholder="PORT" value={port} onChangeText={(text) => setPort(text)} />
          </View>

          <TextInput editable={false} selectTextOnFocus={false} style={styles.inputUser} placeholder="USER" value={user} onChangeText={(text) => setUser(text)} />

          <View style={styles.passwordContainer}>
            <TextInput editable={false} selectTextOnFocus={false} style={styles.inputPassword} placeholder="PASS" secureTextEntry={!showPassword} value={pass} onChangeText={(text) => setPass(text)} />
            <TouchableOpacity style={styles.passwordButton} onPress={() => { setShowPassword(!showPassword) }} >
              <Text style={styles.paswordButtonText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.Red }]} onPress={clearAll}>
              <Text style={{ color: COLORS.Grey20, fontWeight: 'bold' }}>CLEAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' }]} onPress={setDefaultValues}>
              <Text style={{ color: COLORS.White, fontWeight: 'bold' }}>RESTORE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.Green }]} onPress={handelSetConnValues}>
              <Text style={{ color: COLORS.Grey20, fontWeight: 'bold' }}>SET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ConfigPage
