import _ from 'lodash'
import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions/game'
import {keyDownAction, keyUpAction} from '../actions/keyboard'
import {playerCreate,playerMove,playerStop} from '../actions/player'

export default class Game {

  constructor ({store}) {
    this.dispatch = store.dispatch
    this.store = store
    store.subscribe(() => this.onChange(store.getState()))
    this.graphics = {

    }
  }

  start = () => {
    PixiWrapper.start()
    this.app = PixiWrapper.getApp()
    this.bindToKeyboard()
    this.dispatch(playerCreate({id: 1, position: {x: 0, y: 0}}))

    this.app.ticker.add(this.onTick)
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
    if(move.up) console.log('up')
    if(move.down) console.log('down')
    if(move.left) console.log('left')
    if(move.right) console.log('right')
  }

  onKeyUp = (key) => {
    this._processMove(key, false)
  }

  onKeyDown = (key) => {
    this._processMove(key, true)
  }

  _processMove = (key, start) => {
    const currentState = this.store.getState()
    const currentMove = _.get(currentState, `world.things.${currentState.world.playerId}.move`) || {}

    if(key.key === 'w' && currentMove.up != start) {
      this.dispatch(playerMove({up: start}))
    }
    if(key.key === 's' && currentMove.down != start) {
      this.dispatch(playerMove({down: start}))
    }
    if(key.key === 'a' && currentMove.left != start) {
      this.dispatch(playerMove({left: start}))
    }
    if(key.key === 'd' && currentMove.right != start) {
      this.dispatch(playerMove({right: start}))
    }
  }

  onTick = () => {
    this.moveThings()
    this.render()
  }

  render = () => {
    const {things} = this.store.getState().world
    _.each(things, this.renderThing)

  }

  renderThing = (thing) => {
    const graphics  = this.graphics[thing.id] || this.createThing(thing)

  }

  createThing = (thing) => {
    const PIXI      = PixiWrapper.getPixi()
    const app       = PixiWrapper.getApp()
    const graphics  = new PIXI.Graphics()
    graphics.lineStyle(2, 0x0000FF, 1)
    graphics.beginFill(0xFF700B, 1)
    graphics.drawRect(thing.position.x, thing.position.y, 100, 100)
    app.stage.addChild(graphics)
    this.graphics[thing.id] = graphics
  }

  onChange = ({keyboard}) => {
  }


}
