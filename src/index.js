import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import reducer from './reducers'
import Game from './containers'

const store = createStore(reducer, applyMiddleware(logger))

const game = new Game(store)

game.start()
