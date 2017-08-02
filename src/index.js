import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import reducer from './reducers'
import {initialize} from './actions'

const store = createStore(reducer, applyMiddleware(logger))

store.dispatch(initialize())
