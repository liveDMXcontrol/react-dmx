import React, { Component } from 'react';
import { Color, DeviceLabel } from './Widget';
import './LEDParCan.css'

export default class LEDParCan extends Component {
  constructor (props) {
    super(props)
    this.parseToDMX=this.parseToDMX.bind(this)

    this.state = {
      fader: { value: "50", style: { orient: "horizontal" }, property: "brightness" }
    }

    // this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleChange = (e) => {
    this.props.handleColorChange(e, this.parseToDMX)
  }
  parseToDMX = (rgb) => {
    // take a rgb value and break it up into dmx messages
    console.log(this.props)
    let address0 = this.props.address
    let address1 = address0 + 1; let address2 = address1 + 1

    return {
      "channels_list": [
        { "channel": address0, "value": rgb.r },
        { "channel": address1, "value": rgb.g },
        { "channel": address2, "value": rgb.b },
      ]
    }
  }

  render () {
    return (
      <div className="LEDParCan" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <Color
          name="color"
          storedValue={this.props.color}
          handleChange={this.handleChange}
          />
      </div>)
  }
}

// <Knob
//   name="knob1"
//   storedValue={this.state.knob1.value}
//   style={this.state.knob1.style}
//   handleChange={this.handleChange} />
// <Knob
//   name="knob2"
//   storedValue={this.state.knob2.value}
//   style={this.state.knob2.style}
//   handleChange={this.handleChange} />
// <Fader
//   name="fader"
//   storedValue={this.state.fader.value}
//   style={this.state.fader.style}
//   handleChange={this.handleChange} />