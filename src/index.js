import React from 'react'
import {createStore} from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Game from './containers/Game'


const store = createStore(reducer)
console.log(store.getState())
render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('app')
)
