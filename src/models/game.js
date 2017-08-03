import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions/game'
import {keyDownAction, keyUpAction} from '../actions/keyboard'
import {playerCreate, playerMoveUp, playerMoveDown, playerMoveLeft, playerMoveRight} from '../actions/player'

export default class Game {
  constructor ({store}) {
    this.dispatch = store.dispatch
    store.subscribe(() => this.onChange(store.getState()))
  }

  onChange = ({keyboard}) => {
    if(keyboard.up) this.dispatch(playerMoveUp())
    if(keyboard.down) this.dispatch(playerMoveDown())
    if(keyboard.left) this.dispatch(playerMoveLeft())
    if(keyboard.right) this.dispatch(playerMoveRight())
  }

  start = () => {
    PixiWrapper.start()
    this.app = PixiWrapper.getApp()
    this.bindToKeyboard()
    this.dispatch(playerCreate({id: 1, position: {x: 0, y: 0}}))
  }

  bindToKeyboard = () => {
    window.addEventListener('keydown', (key) => {
      this.dispatch(keyDownAction(key))
    })

    window.addEventListener('keyup', (key) => {
      this.dispatch(keyUpAction(key))
    })
  }
}
