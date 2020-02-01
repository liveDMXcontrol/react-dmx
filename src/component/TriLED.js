// {
//   name: "TriLED",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" },
//   spin: 0,
//   dimmer: 0
// }

import React, { Component } from 'react';
import { Button, ColorCircle, DeviceLabel, Fader } from './Widget';
import './TriLED.css'

export default class TriLED extends Component {
  constructor (props) {
    super(props)
    // this.parseToDMX=this.parseToDMX.bind(this)

    this.turnOff=this.turnOff.bind(this)
    this.state = {
      // dimmer: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      color: props.color,
    };
  }
  shouldComponentUpdate(nextProps) {
    return (this.props.fxColor !== nextProps.fxColor ||
            this.props.spinDirection !== nextProps.spinDirection ||
            this.props.fxDimmer !== nextProps.fxDimmer)
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX())
  }

  turnOff = (e, address) => {
    e.preventDefault();
    let name = e.target.name
    e.target.name="spinDirection"
    this.props.resetToZero(e, address)
    e.target.name="fxDimmer"
    this.props.resetToZero(e, address+2)
    e.target.name=name
  }
  parseToDMX = (rgb=this.props.color) => {
    // take a rgb value and break it up into dmx messages
    let address = this.props.address

    if (this.props.color === "white" ) {
      let color = 0
      return {
        "channels_list": [
          { "channel": address,     "value": this.props.spinDirection }, // spin
          { "channel": (address+1), "value": color },                    // color
          { "channel": (address+2), "value": this.props.fxDimmer }       // dimmer
        ]
      }
    } else {
      let color = 0
      switch (rgb) {
        case {r: 255, g: 0, b: 0, a: 1}:
          color=3
          break
        default:
          color=0
          console.log('default (TriLED switch case)')
      }

      return {
        "channels_list": [
          { "channel": address,     "value": this.props.spinDirection }, // spin
          { "channel": (address+1), "value": color },                    // color
          { "channel": (address+2), "value": this.props.fxDimmer }       // dimmer
        ]
      }
    }
  }

  render () {
    return (
      <div className="TriLED" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <ColorCircle
          name="color"
          storedValue={this.props.color}
          handleChange={(e) => this.props.handleColorChange(e, this.parseToDMX)}
          />
        <Fader
          name="spinDirection"
          min={10}
          max={245}
          defaultValue={7}
          storedValue={this.props.spinDirection}
          handleChange={(e) => this.props.handleChange(e, this.props.address)}
          onDoubleClick={(e) => this.props.resetToZero(e, this.props.address)}
          />
        <Fader
          name="fxDimmer"
          min={8}
          max={199}
          defaultValue={8}
          storedValue={this.props.fxDimmer}
          handleChange={(e) => this.props.handleChange(e, this.props.address+2)}
          onDoubleClick={(e) => this.props.resetToZero(e, this.props.address+2)}
          />
        <Button
          name="spinnyOff"
          text="off"
          handleClick={(e) => this.turnOff(e, this.props.address)}
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