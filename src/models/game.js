import _ from 'lodash'
import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions/game'
import {keyDownAction, keyUpAction} from '../actions/keyboard'
import {playerCreate,playerMove,playerStop} from '../actions/player'

export default class Game {
  constructor ({store}) {
    this.dispatch = store.dispatch
    store.subscribe(() => this.onChange(store.getState()))
  }

  onChange = ({keyboard}) => {    
  }

  start = () => {
    PixiWrapper.start()
    this.app = PixiWrapper.getApp()
    this.bindToKeyboard()
    this.dispatch(playerCreate({id: 1, position: {x: 0, y: 0}}))
  }

  bindToKeyboard = () => {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = (key) => {
    if(key.key === 'w') {
      this.dispatch(playerMove({up: false}))
    }
    if(key.key === 's') {
      this.dispatch(playerMove({down: false}))
    }
    if(key.key === 'a') {
      this.dispatch(playerMove({left: false}))
    }
    if(key.key === 'd') {
      this.dispatch(playerMove({right: false}))
    }
  }

  onKeyDown = (key) => {
    if(key.key === 'w') {
      this.dispatch(playerMove({up: true}))
    }
    if(key.key === 's') {
      this.dispatch(playerMove({down: true}))
    }
    if(key.key === 'a') {
      this.dispatch(playerMove({left: true}))
    }
    if(key.key === 'd') {
      this.dispatch(playerMove({right: true}))
    }
  }

}
