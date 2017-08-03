import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate, playerMove} from '../actions/player'

const initialState = {
  playerId: null,
  things: {

  }
}

export default createReducer({
  [playerCreate]: (state, {id, position}) => {
    const {things} = state
    const newThings = {...things}
    newThings[id] = {
      position: {},
      move: {},
      id
    }

    return {...state, playerId: id, things: newThings}
  },

  [playerMove]: (state, payload) => {
    const move      = _.get(state, `things.${state.playerId}.move`)
    const newMove   = {...move, ...payload}
    const newThings = {...state.things}
    _.set(newThings, `${state.playerId}.move`, newMove)
    return {...state, things: newThings}
  }
}, initialState)
