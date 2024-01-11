import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { COLORS } from './utilities'

export const OFFLINE_MIXES = [
  {
    trackId: 0,
    name: 'MASTER',
    color: '#CCCCCC',
    value: 1,
    mute: false,
    pan: 0,
    hwocnt: 1,
    recvcnt: 3,
    recvs: [
      { trackId: 1, name: 'CH 1', color: '#808080', value: 1, mute: false, pan: 0, hwocnt: 0, recvcnt: 0 },
      { trackId: 2, name: 'CH 2', color: '#808080', value: 1, mute: false, pan: 0, hwocnt: 0, recvcnt: 0 },
      { trackId: 3, name: 'MIX 2', color: '#00CC40', value: 1, mute: false, pan: 0, hwocnt: 1, recvcnt: 2 }
    ]
  },
  { trackId: 1, name: 'CH 1', color: '#808080', value: 1, mute: false, pan: 0, hwocnt: 0, recvcnt: 0 },
  { trackId: 2, name: 'CH 2', color: '#808080', value: 1, mute: false, pan: 0, hwocnt: 0, recvcnt: 0 },
  {
    trackId: 3,
    name: 'MIX 1',
    color: '#00CC40',
    value: 1,
    mute: false,
    pan: 0,
    hwocnt: 1,
    recvcnt: 2,
    recvs: [
      { trackId: 1, sendId: 0, name: 'CH 1', color: '#808080', value: 1, mute: false, pan: 0 },
      { trackId: 2, sendId: 0, name: 'CH 2', color: '#808080', value: 1, mute: false, pan: 0 }
    ]
  },
  { trackId: 4, name: 'MIX 2', color: '#CC0040', value: 1, mute: false, pan: 0, hwocnt: 1, recvcnt: 1, recvs: [{ trackId: 1, sendId: 0, name: 'CH 1', color: '#808080', value: 1, mute: false, pan: 0 }] }
]

const OFFLINE_CONTROLS = [
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#000000', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#00FF20', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#FF3000', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#FFFFFF', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#FF00FF', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#00FFFF', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#FF00FF', value: 0 },
  { type: 'KNOB', name: 'KNOB', minValue: 0, maxValue: 100, color: '#00FFFF', value: 0 },
  { type: 'BUTTON', mode: 'toggle', name: 'BUTTON', steps: [ { value: 0, color: '#AAAAAA' }, { value: 100, color: '#00FF70' } ], currentStep: 0 },
  {
    type: 'BUTTON',
    mode: 'press',
    name: 'BUTTON 10',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'step',
    name: 'BUTTON 11',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 25, color: '#00FF70' },
      { value: 50, color: '#FFFF70' },
      { value: 100, color: '#FF0070' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'toggle',
    name: 'BUTTON 12',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'toggle',
    name: 'BUTTON 13',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'toggle',
    name: 'BUTTON 14',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'toggle',
    name: 'BUTTON 15',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  },
  {
    type: 'BUTTON',
    mode: 'toggle',
    name: 'BUTTON 16',
    steps: [
      { value: 0, color: '#AAAAAA' },
      { value: 100, color: '#00FF70' }
    ],
    currentStep: 0
  }
]

const INITIAL_STATE = {
  conn: { ip: '192.168.0.32', port: '9000', user: '', pass: '', status: false, name: 'ANDROID_DEVICE' },
  alert: [false, '#CC0000'],
  mode: 'HOME',
  selectedMix: 0,
  mixes: OFFLINE_MIXES,
  isSending: true,
  osdControls: OFFLINE_CONTROLS,
  orientation: false,
  lockScreen: true
}

// ---------- SLICE --------------- //

const dataSlice = createSlice({
  name: 'data',
  initialState: INITIAL_STATE,
  reducers: {
    setStatus: (state, action) => {
      state.conn.status = action.payload
    },

    setConnValues: (state, action) => {
      state.conn.ip = action.payload.ip
      state.conn.port = action.payload.port
      state.conn.user = action.payload.user
      state.conn.pass = action.payload.pass
      state.conn.deviceName = action.payload.deviceName
    },

    setMode: (state, action) => {
      state.mode = action.payload
      if (state.mode === 'MIXER') {
        state.isSending = false
      } else {
        state.isSending = true
      }
    },

    setMix: (state, action) => {
      state.selectedMix = action.payload
    },

    setIsSending: (state, action) => {
      state.isSending = action.payload
    },

    setTracks: (state, action) => {
      const mixes = action.payload

      //if (mixes[state.selectedMix]?.recvcnt === 0 || mixes[state.selectedMix]?.name !== state.mixes[state.selectedMix]?.name) {}

      if (state.mixes.length !== mixes.length) {
        if (state.selectedMix !== 0) {
          state.alert = [`TOTAL TRACKS HAS CHANGE, SELECT YOUR MIX AGAIN`, COLORS.Red]
          state.selectedMix = 0
        }
        state.mixes = mixes
      } else {
        for (let i = 0; i < state.mixes.length; i++) {
          for (let key in state.mixes[i]) {
            if (key === 'recvs') {
              if (state.mixes[i][key].length !== mixes[i][key].length) {
                state.mixes[i][key] = mixes[i][key]
              } else {
                for (let x = 0; x < state.mixes[i][key].length; x++) {
                  for (let recvKey in state.mixes[i][key][x]) {
                    if (state.mixes[i][key][x][recvKey] !== mixes[i][key][x][recvKey] && recvKey !== 'recvs') {
                      state.mixes[i][key][x][recvKey] = mixes[i][key][x][recvKey]
                    }
                  }
                }
              }
            } else if (state.mixes[i][key] != mixes[i][key]) {
              state.mixes[i][key] = mixes[i][key]
            }
          }
        }
      }
      //state.mixes = mixes
      //console.log(state.mixes[0].recvs)
    },

    sendValue: (state, action) => {
      const { x, value, isSending, type } = action.payload
      let endpoint

      if (!state.conn.status) {
        return
      }

      try {
        if (x === 'MASTER') {
          endpoint = `/TRACK/${state.selectedMix}/${type}/${value}`
        } else if (state.selectedMix === 0) {
          endpoint = `/TRACK/${state.mixes[state.selectedMix].recvs[x].trackId}/${type}/${value}`
        } else {
          endpoint = `/TRACK/${state.mixes[state.selectedMix].recvs[x].trackId}/SEND/${state.mixes[state.selectedMix].recvs[x].sendId}/${type}/${value}`
        }

        axios.get(`http://${state.conn.ip}:${state.conn.port}/_/SET` + endpoint, { timeout: 1000 })

        if (isSending === true) {
          state.isSending = true
        } else if (isSending === false) {
          state.isSending = false
        }

        if (type === 'MUTE') {
          if (x === 'MASTER') {
            state.mixes[state.selectedMix].mute = value
          } else {
            state.mixes[state.selectedMix].recvs[x].mute = value
          }
        }
      } catch (e) {
        console.error('Axios request failed:', e)
      }
    },

    sendOsc: (state, action) => {
      const [x, value, currentStep] = action.payload
      //console.log("newStep",currentStep)

      if (currentStep === undefined) {
        state.osdControls[x].value = value
      } else {
        state.osdControls[x].currentStep = currentStep
      }

      if (!state.conn.status) {
        return
      }

      try {
        axios.get(`http://${state.conn.ip}:${state.conn.port}/_/OSC/${state.conn.name}_${x}:${value / 100}`, { timeout: 100 })
      } catch (e) {
        console.error('Axios request failed:', e)
      }
    },

    popError: (state, action) => {
      state.alert = [action.payload, COLORS.Red]
    },

    popInfo: (state, action) => {
      state.alert = [action.payload, COLORS.White]
    },

    popSuccess: (state, action) => {
      state.alert = [action.payload, COLORS.Green]
    },

    popWarn: (state, action) => {
      state.alert = [action.payload, COLORS.Yellow]
    },

    setOrientation: (state, action) => {
      state.orientation = action.payload < 3 ? true : false
    },

    setLockScreen: (state, action) => {
      state.lockScreen = action.payload
    }
  }
})

export const { setStatus, setTracks, setConnValues, setMode, setMix, sendValue, setIsSending, popError, popInfo, popSuccess, popWarn, setName, setOrientation, setLockScreen, sendOsc } = dataSlice.actions

// ---------- STORE --------------- //

export const store = configureStore({
  reducer: dataSlice.reducer
})
