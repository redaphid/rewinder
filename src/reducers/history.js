import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate} from '../actions/player'
import {thingMove} from '../actions/things'

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
  [thingMove]: (state, {id, move}) => {
    if(!(id === state.playerId)) return state

    const oldThings = state.things
    const newThings = {...oldThings}
    const playerHistory = _.clone(newThings[id])
    playerHistory.push({move, time: performance.now()})
    newThings[id] = playerHistory

    return {...state, things: newThings}
  },
}, initialState)
