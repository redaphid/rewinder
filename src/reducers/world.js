import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate} from '../actions/player'
import {thingPositionUpdate, thingMove} from '../actions/things'
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
      position,
      move: {},
      id
    }

    return {...state, playerId: id, things: newThings}
  },

  [thingMove]: (state, {id, move}) => {
    const oldMove      = _.get(state, `things.${id}.move`)
    const newMove   = {...oldMove, ...move
    const newThings = {...state.things}
    _.set(newThings, `${id}.move`, newMove)
    return {...state, things: newThings}
  },

  [thingPositionUpdate]: (state, payload) => {
    const position = _.get(state, `things.${state.playerId}.position`)
    const newPosition = {
      ...position,
      x: position.x + (payload.position.x || 0),
      y: position.y + (payload.position.y || 0)
    }

    const newThings = {...state.things}
    _.set(newThings, `${state.playerId}.position`, newPosition)
    return {...state, things: newThings}
  }
}, initialState)
