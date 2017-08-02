import {createStore} from 'redux'
import reducer from './reducers'
import renderer from './renderer'

renderer.start()
const store = createStore(reducer)
