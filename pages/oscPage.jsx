import { View } from 'react-native'
import OSCControl from '../components/oscControl'
import { useSelector } from 'react-redux'
import {styles} from "../styles/osdPageStyles"

const OSCPage = () => {
  console.log('COMPONENTE OSD')
  const orientation = useSelector((state) => state.orientation)

  const renderBlock = (start, end) => {
    return (
      <View style={[styles(orientation).blockContainer]}>
        {Array.from({ length: end - start }, (_, index) => (
            <OSCControl key={index + start} x={index + start} />
        ))}
      </View>
    )
  }

  return (
    orientation ? (
        <View style={styles(orientation).container}>
          {renderBlock(0, 4)}
          {renderBlock(4, 8)}
          {renderBlock(8, 12)}
          {renderBlock(12, 16)}
          {renderBlock(16, 20)}
          {renderBlock(20, 24)}
          {renderBlock(24, 28)}
          {renderBlock(28, 32)}
        </View>
      ) : (
        <View style={styles(orientation).container}>
          {renderBlock(0, 8)}
          {renderBlock(8, 16)}
          {renderBlock(16, 24)}
          {renderBlock(24, 32)}
        </View>
      )
  )
}

export default OSCPage
