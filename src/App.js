import React, { Component } from 'react'
import { genImageData } from './mandlebrot'
import ImageManipulator from './ImageManipulator'

class App extends Component {
  /**
   * C'tor
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = { imageWidth: 800, imageHeight: 800 }
  }

  /**
   * React event
   */
  componentDidMount() {
    this.updateCanvas()
  }

  /**
   * React event
   */
  componentDidUpdate() {
    this.updateCanvas()
  }

  /**
   * Update the canvas with the mandelbrot image data
   */
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
    const ctx2 = this.refs.canvas2.getContext('2d')
    const imgData = new ImageData(
      genImageData(this.state.imageWidth, this.state.imageHeight),
      this.state.imageWidth,
      this.state.imageHeight
    )
    ctx.clearRect(0, 0, this.state.imageWidth, this.state.imageHeight)
    ctx.putImageData(imgData, 0, 0)
    ctx2.clearRect(0, 0, this.state.imageWidth, this.state.imageHeight)
    ctx2.putImageData(imgData, 0, 0)
  }

  /**
   * User input change for image size
   */
  onSizeChange = newVal => {
    this.setState({
      imageWidth: newVal.imageWidth,
      imageHeight: newVal.imageHeight
    })
  }

  /**
   * React event
   */
  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.state.imageWidth}
          height={this.state.imageHeight}
        />
        <canvas
          ref="canvas2"
          width={this.state.imageWidth}
          height={this.state.imageHeight}
        />
        <ImageManipulator
          onSizeChange={this.onSizeChange}
          width={this.state.imageWidth}
          height={this.state.imageHeight}
        />
      </div>
    )
  }
}

export default App
