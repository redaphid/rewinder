import {createStore} from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
const app = new PIXI.Application()
document.body.appendChild(app.view)
