import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import keyboardReducer from './reducers/keyboard'

import Game from './models/game'

const keyboardStore = createStore(keyboardReducer, applyMiddleware(logger))

const game = new Game({keyboardStore})

game.start()
