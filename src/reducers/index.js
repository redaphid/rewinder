import { createReducer } from 'redux-act'
import { initialize } from '../actions'
import PixiWrapper from '../pixi.js'

const initialState = {
  intialized: false
}

export default createReducer({
  [initialize]: (state) => {
    if(state.initialized === true) return state
    PixiWrapper.start()
    return {...state, intialized: true}
  },
}, initialState)
