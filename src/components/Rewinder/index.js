import React from 'react'
import { Loop, Stage, World, KeyListener, AudioPlayer } from 'react-game-kit'
export default (props) => {
  return (
    <Loop>
      <Stage style={{ background: '#2e3235', position: 'static' }}>
        <World onInit={this.physicsInit} onCollision={this.onCollision}>
        </World>
      </Stage>
    </Loop>
  )
}
