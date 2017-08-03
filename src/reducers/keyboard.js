import { createReducer } from 'redux-act'
import {keyDownAction, keyUpAction} from '../actions/keyboard'

const initialState = {
  up: false,
  down: false,
  left: false,
  right: false
}

export default createReducer({
  [keyDownAction]: (state, payload) => {
    if(payload.key === 'w') {
      return {...state, up: true}
    }
    if(payload.key === 's') {
      return {...state, down: true}
    }
    if(payload.key === 'a') {
      return {...state, left: true}
    }
    if(payload.key === 'd') {
      return {...state, right: true}
    }

    return state
  },

  [keyUpAction]: (state, payload) => {
    if(payload.key === 'w') {
      return {...state, up: false}
    }
    if(payload.key === 's') {
      return {...state, down: false}
    }
    if(payload.key === 'a') {
      return {...state, left: false}
    }
    if(payload.key === 'd') {
      return {...state, right: false}
    }

    return state
  }
}, initialState)
