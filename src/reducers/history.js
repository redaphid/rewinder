import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate, playerMove} from '../actions/player'

const initialState = {
  playerId: null,
  startTime: null,
  things: {},
}

export default createReducer({
  [playerCreate]: (state, {id}) => {
    const oldThings = state.things
    const newThings = {...oldThings}
    newThings[id] = []
    return {...state, playerId: id, things: newThings, startTime: performance.now()}
  },
  [playerMove]: (state, move) => {
    const oldThings = state.things
    const id = state.playerId
    const newThings = {...oldThings}
    const playerHistory = _.clone(newThings[id])
    playerHistory.push({move, time: performance.now()})
    newThings[id] = playerHistory

    return {...state, things: newThings}
  },
}, initialState)
