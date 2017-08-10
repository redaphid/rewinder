import { createReducer } from 'redux-act'
import _ from 'lodash'
import {playerCreate, playerRewind} from '../actions/player'
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
    const newMove   = {...oldMove, ...move}
    const newThings = {...state.things}
    _.set(newThings, `${id}.move`, newMove)
    return {...state, things: newThings}
  },

  [thingPositionUpdate]: (state, {id, position}) => {
    const oldPosition = _.get(state, `things.${id}.position`)
    const newPosition = {
      ...oldPosition,
      x: oldPosition.x + (position.x || 0),
      y: oldPosition.y + (position.y || 0)
    }

    const newThings = {...state.things}
    _.set(newThings, `${id}.position`, newPosition)
    return {...state, things: newThings}
  },

  [playerRewind]: (state) => {
    const newThings = _.mapValues(_.cloneDeep(state.things), (thing) => {
      return {...thing, position: {x: 0, y: 0}}
    })

    return {...state, things: newThings}
  }

}, initialState)
