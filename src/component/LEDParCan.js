import React, { Component } from 'react';
import { ColorXY, DeviceLabel } from './Widget';
import './LEDParCan.css'

export default class LEDParCan extends Component {
  constructor (props) {
    super(props)

    // this.handleChange = this.handleChange.bind(this)
    this.state = {
      device: { name: "", address: 50 },
      // knob1: { value: "0", style: { width: "150px", height: "150px" } },
      // knob2: { value: "0", style: { width: "150px", height: "150px" } },
      color: { value: "#FFFFFF" },
      fader: { value: "50", style: { orient: "horizontal" }, property: "brightness"}
    }
  }

  parseToDMX = (rgb) => {
    // take a rgb value and break it up into dmx messages
    let address0 = this.state.device.address
    let address1 = address0 + 1; let address2 = address1 + 1

    return {
      "channels_list": [
        { "channel": address0, "value": rgb.r },
        { "channel": address1, "value": rgb.g },
        { "channel": address2, "value": rgb.b },
      ]
    }

  }
  handleChange = (e) => {
    let newState = this.state
    newState[e.target.name].value = e.target.value
    this.setState(newState)

    this.props.updateDMX(this.parseToDMX(this.state.color.value))
  }
  handleColorChange = (e) => {
    let newState = this.state
    newState.color.value = e.rgb
    this.setState(newState)

    this.props.updateDMX(this.parseToDMX(this.state.color.value))
  }

  render () {
    return (
      <div className="LEDParCan">
        <DeviceLabel
          name="LEDParCan"
          />
        <ColorXY
          name="color"
          storedValue={this.state.color.value}
          handleChange={this.handleColorChange}
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