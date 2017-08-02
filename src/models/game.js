import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions/game'
import {keyDownAction, keyUpAction} from '../actions/keyboard'

export default class Game {
  constructor ({gameStore, keyboardStore}) {
    this.dispatchKeyboard = keyboardStore.dispatch
    keyboardStore.subscribe(() => this.onKeyboardChange(keyboardStore.getState()))
  }

  onKeyboardChange = (state) => {

  }

  start = () => {
    PixiWrapper.start()
    this.app = PixiWrapper.getApp()
    this.bindToKeyboard()
  }

  bindToKeyboard = () => {
    window.addEventListener('keydown', (key) => {
      this.dispatchKeyboard(keyDownAction(key))
    })

    window.addEventListener('keyup', (key) => {
      this.dispatchKeyboard(keyUpAction(key))
    })
  }

  dispatchTicks = () => {
    this.app.ticker.add( () => {
      this.dispatch(gameTickAction())
    })
  }

}
