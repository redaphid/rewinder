import { createAction } from 'redux-act'
export const playerCreate = createAction('player/create')
export const playerMoveUp = createAction('player/move/up')
export const playerMoveDown = createAction('player/move/down')
export const playerMoveLeft = createAction('player/move/left')
export const playerMoveRight = createAction('player/move/right')
