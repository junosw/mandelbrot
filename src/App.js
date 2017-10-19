import React, { Component } from 'react'
import { gen, IMAGE_WIDTH, IMAGE_HEIGHT } from './mandlebrot'

class App extends Component {
  componentDidMount() {
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
    const imgData = new ImageData(gen(), IMAGE_WIDTH, IMAGE_HEIGHT)
    ctx.putImageData(imgData, 0, 0)
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
      </div>
    )
  }
}

export default App
