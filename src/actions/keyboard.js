import { createAction } from 'redux-act'
export const keyDownAction  = createAction('keyboard/down')
export const keyUpAction    = createAction('keyboard/up')
export const keyRightAction = createAction('keyboard/right')
export const keyLeftAction  = createAction('keyboard/left')
