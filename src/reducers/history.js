import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate} from '../actions/player'
import {thingMove} from '../actions/things'

const initialState = {
  playerId: null,
  things: {},
}

export default createReducer({
  [playerCreate]: (state, {id}) => {
    const oldThings = state.things
    const newThings = {...oldThings}
    newThings[id] = {
      startTime: performance.now(),
      moves: []
    }
    return {...state, playerId: id, things: newThings}
  },

  [thingMove]: (state, {id, move}) => {
    if(!(id === state.playerId)) return state

    const oldThings = state.things
    const newThings = {...oldThings}
    const playerHistory = _.clone(newThings[id].moves)
    playerHistory.push({move, time: performance.now()})
    newThings[id].moves = playerHistory

    return {...state, things: newThings}
  },
}, initialState)
