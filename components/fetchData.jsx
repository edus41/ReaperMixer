import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setTracks, setStatus, OFFLINE_MIXES, popError, popSuccess } from '../redux'
import { manageReplay, intToHexColor } from '../utilities'

const FetchData = () => {
  //console.log('COMPONENTE FetchData')
  const dispatch = useDispatch()
  const CONN = useSelector((state) => state.conn)
  const MODE = useSelector((state) => state.mode)
  const IS_SENDING = useSelector((state) => state.isSending)
  const IS_FETCHING = useRef(false)
  const IS_GETTING_STATUS = useRef(false)

  async function getStatus() {
    try {
      IS_GETTING_STATUS.current = true
      const response = await axios.get(`http://${CONN.ip}:${CONN.port}/_/NTRACK`, { timeout: 2000 })
      if (response.status === 200) {
        if (!CONN.status) {
          dispatch(setStatus(true))
          dispatch(popSuccess('CONNECTED'))
        }
      } else {
        if (CONN.status) {
          dispatch(setStatus(false))
          dispatch(popError('Unexpected response status'))
        }
      }
    } catch (error) {
      if (CONN.status) {
        dispatch(setStatus(false));
        if (error.code === 'ECONNABORTED') {
          dispatch(popError('TIMEOUT, CANNOT CONNECT TO REAPER'));
        } else {
          dispatch(popError(error.message));
        }
      }
    } finally {
      IS_GETTING_STATUS.current = false
    }
  }

  async function getInfo(){
    try{
      if (IS_SENDING || IS_FETCHING.current) {
        if(MODE==="OSD" || MODE==="HOME"){
          if(!IS_GETTING_STATUS.current){
            await getStatus()
          }
        }
        return
      }
      
      IS_FETCHING.current = true
      await reaperFetch()
      
    } catch (e) {
      console.error('[ERROR]: ', e)
      if (CONN.status) {
        dispatch(setStatus(false))
        if (e.code === 'ECONNABORTED') {
          dispatch(popError('TIMEOUT, CANT CONNECT TO REAPER'))
        } else {
          dispatch(popError(e.message))
        }
      }
      dispatch(setTracks(OFFLINE_MIXES))
    } finally {
      IS_FETCHING.current = false
    }
    
  }

  function obtainMxes(TRACKS,SENDS){
    const MIXES = TRACKS.map((track) => {
      if (track.trackId !== 0 || track.recvcnt > 0) {
        const TRACK_RECVS = SENDS.filter((send) => send.mixId === track.trackId)
        track.recvs = TRACK_RECVS.map((recv) => ({ ...recv }))
      } else {
        const MASTER_RECVS = TRACKS.filter((masterTrack) => masterTrack.trackId !== 0)
        track.recvs = MASTER_RECVS.map((masterRecv) => ({ ...masterRecv }))
        track.recvcnt = MASTER_RECVS.length
      }
      return track
    })

    if (!CONN.status) {
      dispatch(setStatus(true))
      dispatch(popSuccess('CONNECTED'))
    }

    dispatch(setTracks(MIXES))
  }

  async function reaperFetch() {
    const { data } = await axios.get(`http://${CONN.ip}:${CONN.port}/_/TRACK`, { timeout: 200 })
    const TRACK_DATA = manageReplay(data)
  
    const trackPromises = TRACK_DATA.map(async (TRACK) => {
      const ID = parseInt(TRACK[1])
      const NAME = TRACK[2] === '' ? 'EMPTY' : TRACK[2]
      const MUTE = (TRACK[3] & 8) !== 0
      const VALUE = parseFloat(TRACK[4])
      const PAN = parseFloat(TRACK[5])
      const SEND_CNT = parseInt(TRACK[10])
      const RECV_CNT = parseInt(TRACK[11])
      const HW_OUT = parseInt(TRACK[12])
      const COLOR = ID !== 0 ? intToHexColor(TRACK[13]) : '#CCCCCC'
  
      const sendsPromises = []
  
      if (SEND_CNT > 0) {
        for (let x = 0; x < SEND_CNT; x++) {
          sendsPromises.push(axios.get(`http://${CONN.ip}:${CONN.port}/_/GET/TRACK/${ID}/SEND/${x}`, { timeout: 200 }))
        }
      }
  
      const sendsData = await Promise.all(sendsPromises)
      const SENDS = sendsData.map((send) => {
        const SEND = manageReplay(send.data)[0]
        const TRACK_ID = parseInt(SEND[1])
        const SEND_ID = parseInt(SEND[2])
        const MUTE = (parseInt(SEND[3]) & 8) !== 0
        const VALUE = parseFloat(SEND[4])
        const PAN = parseFloat(SEND[5])
        const MIX_ID = parseInt(SEND[6])
        return { trackId: TRACK_ID, sendId: SEND_ID, name: NAME, color: COLOR, value: VALUE, mute: MUTE, pan: PAN, mixId: MIX_ID }
      })
  
      return { trackId: ID, name: NAME, color: COLOR, value: VALUE, mute: MUTE, pan: PAN, hwocnt: HW_OUT, recvcnt: RECV_CNT, mixId: 0, SENDS }
    })
  
    const TRACKS = await Promise.all(trackPromises)
    const SENDS = TRACKS.reduce((acc, track) => acc.concat(track.SENDS), [])
    const TRACKSWithoutSends = TRACKS.map(({ SENDS, ...rest }) => rest);
    obtainMxes(TRACKSWithoutSends, SENDS)
  }

  useEffect(() => {
    const intervalId = setInterval(getInfo, 250)
    return () => {
      clearInterval(intervalId)
    }
  }, [CONN, IS_SENDING])

  return null
}

export default FetchData