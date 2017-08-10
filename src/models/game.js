import _ from 'lodash'
import UUID from 'uuid'

import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions/game'
import {playerCreate, playerRewind} from '../actions/player'
import {thingMove, thingPositionUpdate} from '../actions/things'

export default class Game {

  constructor ({store}) {
    this.dispatch = store.dispatch
    this.store = store
    store.subscribe(() => this.onChange(store.getState()))
  }

  start = () => {
    PIXI = PixiWrapper.getPixi()
    PixiWrapper.start()
    this.app        = PixiWrapper.getApp()
    this.graphics   = new PIXI.Graphics()
    this.app.stage.addChild(this.graphics)

    this.bindToKeyboard()
    this.app.ticker.add(this.onTick)
    this.createPlayer()
  }

  createPlayer = () => {
    this.dispatch(playerCreate({id: UUID.v4(), position: {x: 0, y: 0}}))
  }

  bindToKeyboard = () => {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  moveThings = () => {
    const {things} = this.store.getState().world
    _.each(things, (thing) => {
      this.moveThing(thing)
    })
  }

  moveThing = (thing) => {
    if(!thing.move) return
    const {move} = thing
    const position = {}
    if(move.up)   position.y = -1
    if(move.down) position.y = 1
    if(move.left) position.x = -1
    if(move.right) position.x = 1
    if(_.isEmpty(position)) return
    this.dispatch(thingPositionUpdate({id: thing.id, position}))
  }

  onKeyUp = (key) => {
    this._processMove(key, false)
  }

  onKeyDown = (key) => {
    this._processMove(key, true)
  }

  _processMove = (key, start) => {
    const currentState = this.store.getState()
    const playerId = currentState.world.playerId
    const currentMove = _.get(currentState, `world.things.${currentState.world.playerId}.move`) || {}

    if(key.key === 'w' && currentMove.up != start) {
      this.dispatch(thingMove({id: playerId, move: {up: start}}))
    }
    if(key.key === 's' && currentMove.down != start) {
      this.dispatch(thingMove({id: playerId, move: {down: start}}))
    }
    if(key.key === 'a' && currentMove.left != start) {
      this.dispatch(thingMove({id: playerId, move: {left: start}}))
    }
    if(key.key === 'd' && currentMove.right != start) {
      this.dispatch(thingMove({id: playerId, move: {right: start}}))
    }

    if(key.key === 'r' && start) {
      this.rewind()
    }
  }

  rewind = () => {
    this.createPlayer()
    this.dispatch(playerRewind())
  }

  onTick = () => {
    this.moveThings()
    this.render()
  }

  render = () => {
    this.graphics.clear()
    const {things} = this.store.getState().world
    _.each(things, this.renderThing)
  }

  renderThing = (thing) => {
    this.graphics.lineStyle(2, 0x0000FF, 1)
    this.graphics.beginFill(0xFF700B, 1)
    this.graphics.drawRect(thing.position.x, thing.position.y, 50, 100)
  }

  onChange = ({keyboard}) => {
  }


}
