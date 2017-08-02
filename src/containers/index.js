import PixiWrapper from '../pixi'
import {gameTickAction} from '../actions'

export default class Game {
  constructor (state) {
    // state.subscribe(() => this.onStateChange(state.getState()))
    this.dispatch = state.dispatch
  }

  start = () => {
    PixiWrapper.start()
    this.app = PixiWrapper.getApp()
    this.app.ticker.add( () => {
      this.dispatch(gameTickAction())
    })
  }
}
