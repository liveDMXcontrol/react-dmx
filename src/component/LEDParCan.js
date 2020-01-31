import React, { Component } from 'react';
import { ColorXY, DeviceLabel } from './Widget';
import './LEDParCan.css'

export default class LEDParCan extends Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.state = {
      name: {...props},
      address: 50,
      color: "#FFFFFF",
      fader: { value: "50", style: { orient: "horizontal" }, property: "brightness" }
    }

    this.handleColorChange = this.handleColorChange.bind(this)
  }

  parseToDMX = (rgb) => {
    // take a rgb value and break it up into dmx messages
    let address0 = this.state.address
    let address1 = address0 + 1; let address2 = address1 + 1

    return {
      "channels_list": [
        { "channel": address0, "value": rgb.r },
        { "channel": address1, "value": rgb.g },
        { "channel": address2, "value": rgb.b },
      ]
    }

  }
  // handleChange = (e) => {
  //   let newState = this.state
  //   newState[e.target.name].value = e.target.value
  //   this.setState(newState)
  //
  //   this.props.updateDMX(this.parseToDMX(this.state.color))
  // }
  handleColorChange = (e) => {
    let newState = this.state
    newState.color = e.rgb
    this.setState(newState)

    this.props.updateDMX(this.parseToDMX(this.state.color))
  }

  render () {
    return (
      <div className="LEDParCan" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <ColorXY
          name="color"
          storedValue={this.state.color}
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