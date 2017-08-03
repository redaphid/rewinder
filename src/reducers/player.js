import { createReducer } from 'redux-act'
import _ from 'lodash'
import {
  playerCreate, playerMoveUp, playerMoveDown, playerMoveRight, playerMoveLeft
} from '../actions/player'

const initialState = {
  id: null
}

export default createReducer({
  [playerCreate]: (state, {id, position}) => {
    return {...state, id, position}
  },
  [playerMoveUp]: (state) => {
    const {position} = state
    const newPosition = {position, y: state.position.y + 1}
    return {...state, position}
  },
  [playerMoveDown]: (state) => {
    const {position} = state
    const newPosition = {position, y: state.position.y - 1}
    return {...state, position}
  },
  [playerMoveLeft]: (state) => {
    const {position} = state
    const newPosition = {position, y: state.position.x - 1}
    return {...state, position}
  },
  [playerMoveRight]: (state) => {
    const {position} = state
    const newPosition = {position, y: state.position.x + 1}
    return {...state, position}
  }
}, initialState)
