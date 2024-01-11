import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation'
import { setOrientation } from '../redux'

const OrientationHandler = () => {
  const dispatch = useDispatch()
  const lock = useSelector(state=>state.lockScreen)
  const mode = useSelector(state=>state.mode)

  const getCurrentOrient = async () => {
    try {
      const currentOrient = await ScreenOrientation.getOrientationAsync()
      dispatch(setOrientation(currentOrient))
    } catch (error) {
      console.error('Error getting current orientation:', error)
    }
  }

  const onOrientChange = (orient) => {
    const newOrient = orient.orientationInfo.orientation
    dispatch(setOrientation(newOrient))
  }

  useEffect(() => {
    unlockScreen()
    getCurrentOrient()
    const screenOrientationListener = ScreenOrientation.addOrientationChangeListener((orient) => {
      onOrientChange(orient)
    })

    return () => {
      ScreenOrientation.removeOrientationChangeListener(screenOrientationListener)
    }
  }, [])

  const unlockScreen = async () => {
    try {
      await ScreenOrientation.unlockAsync()
    } catch (error) {
      console.error('Error unlocking screen:', error)
    }
  }

  const lockScreen = async () => {
    try {
      const currentOrient =  await ScreenOrientation.getOrientationAsync()

      switch (currentOrient) {
        case 1:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
          break;
        case 2:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN)
          break;
        case 3:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
          break;
        case 4:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
          break;
        default:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }

    } catch (error) {
      console.error('Error locking screen:', error)
    }
  }

  useEffect(() => {
    if(mode==="HOME"){
      async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      }
      changeScreenOrientation()
    } else {
      if (lock) {
        lockScreen()
      } else {
        unlockScreen()
      }
    }

  }, [lock,mode])

  return null
}

export default OrientationHandler
