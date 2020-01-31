// {
//   name: "FourBar1",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" }
// }

import React, { Component } from 'react';
import { ColorSketch, DeviceLabel } from './Widget';
import './FourBar.css'

export default class FourBar extends Component {
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
    let address = this.props.address

    return {
      "channels_list": [
        { "channel": address,        "value": rgb.r },
        { "channel": (address + 1),  "value": rgb.g },
        { "channel": (address + 2),  "value": rgb.b },
        { "channel": (address + 3),  "value": rgb.r },
        { "channel": (address + 4),  "value": rgb.g },
        { "channel": (address + 5),  "value": rgb.b },
        { "channel": (address + 6),  "value": rgb.r },
        { "channel": (address + 7),  "value": rgb.g },
        { "channel": (address + 8),  "value": rgb.b },
        { "channel": (address + 9),  "value": rgb.r },
        { "channel": (address + 10), "value": rgb.g },
        { "channel": (address + 11), "value": rgb.b },
      ]
    }
  }

  render () {
    return (
      <div className="FourBar" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <ColorSketch
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