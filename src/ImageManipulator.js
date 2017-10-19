import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { toNumber } from 'lodash'

class ImageManipulator extends Component {
  /**
   * Width input box val change event
   */
  widthChange = event => {
    this.props.onSizeChange({
      imageWidth: toNumber(event.target.value),
      imageHeight: this.props.height
    })
  }

  /**
   * Height input box val change event
   */
  heightChange = event => {
    this.props.onSizeChange({
      imageWidth: this.props.width,
      imageHeight: toNumber(event.target.value)
    })
  }

  /**
   * React event
   */
  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Width</ControlLabel>
          <FormControl
            value={this.props.width ? this.props.width : ''}
            type={'number'}
            onChange={this.widthChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Height</ControlLabel>
          <FormControl
            value={this.props.height ? this.props.height : ''}
            type={'number'}
            onChange={this.heightChange}
          />
        </FormGroup>
      </form>
    )
  }
}

ImageManipulator.propTypes = {
  onSizeChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default ImageManipulator
