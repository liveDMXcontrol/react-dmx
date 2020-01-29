import React, { Component } from 'react';
import { ColorXY, DeviceLabel, Knob, Fader } from './Widget';
import './LEDParCan.css'

export default class LEDParCan extends Component {
  constructor (props) {
    super(props)

    // this.handleChange = this.handleChange.bind(this)
    this.state = {
      // knob1: { value: "0", style: { width: "150px", height: "150px" } },
      // knob2: { value: "0", style: { width: "150px", height: "150px" } },
      color: { value: "#FFFFFF" },
      fader: { value: "0", style: { orient: "horizontal" }, property: "brightness"}
    }
  }

  handleChange = (e) => {
    console.log(e.target)
    let newState = this.state
    newState[e.target.name].value = e.target.value
    console.log(newState)
    this.setState(newState)
  }

  render () {
    return (
      <div className="LEDParCan">
        <DeviceLabel
          name="LEDParCan"
          />
        <ColorXY
          name="color"
          value={this.state.color.value}
          handleChange={this.handleChange}
          />
        <Fader
          name="fader"
          storedValue={this.state.fader.value}
          style={this.state.fader.style}
          propertyName={this.state.fader.property}
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