import { View, Text, TouchableHighlight } from 'react-native'
import { styles } from '../../styles/osdPageStyles'

export default function ButtonOSD({x, mode, currentStep, onValueChange, steps, name, textColor }) {
  const color = steps[currentStep].color
  const underlayColor = steps[currentStep + 1] != undefined ? steps[currentStep + 1].color : steps[0].color

  const handlePress = () => {
    let newStep = 0
    if (steps[currentStep + 1] !== undefined) {
      newStep = currentStep + 1
    } else {
      newStep = 0
    }
    const newVal = steps[newStep].value
    onValueChange(newVal, newStep)
  }

  return (
    <View style={{ height: '70%', width: '90%', justifyContent: 'center', alignItems: 'center' }}>
      {mode === 'press' ? (
        <TouchableHighlight underlayColor={underlayColor} onPressIn={handlePress} onPressOut={handlePress} style={[styles().button, { backgroundColor: color, borderColor: color }]}>
          <Text style={[styles().buttonText, { color: textColor }]}>{name}</Text>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight underlayColor={underlayColor} onPress={handlePress} style={[styles().button, { backgroundColor: color }]}>
          <Text style={[styles().buttonText, { color: textColor }]}>{name}</Text>
        </TouchableHighlight>
      )}
    </View>
  )
}
