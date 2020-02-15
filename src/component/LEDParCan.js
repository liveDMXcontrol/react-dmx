import React, { Component } from 'react';
import { ColorSketch, DeviceLabel } from './Widget';
import './LEDParCan.css'

export default class LEDParCan extends Component {
  constructor (props) {
    super(props)
    this.parseToDMX=this.parseToDMX.bind(this)
    this.selectColorChange=this.selectColorChange.bind(this)

    this.state = {
      fader: { value: "50", style: { orient: "horizontal" }, property: "brightness" },
      color: {r: 255, g: 255, b: 255, a: 1}
    }

    // this.handleColorChange = this.handleColorChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      color: (props.linkToWash) ? props.color : state.color,
    };

  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX(
        this.props.color, this.props.masterDimmer))
  }

  selectColorChange (e) {
    if (this.props.linkToWash) {
      return this.props.handleWashColorChange(e)
    } else {
      return this.props.handleColorChange(e, this)
    }
  }
  parseToDMX = (rgb, dimmer) => {
    // take a rgb value and break it up into dmx messages
    // console.log(this.props)
    let address = this.props.address

    return {
      "channels_list": [
        { "channel": (address),     "value": Math.round(rgb.r * dimmer/100) },
        { "channel": (address + 1), "value": Math.round(rgb.g * dimmer/100) },
        { "channel": (address + 2), "value": Math.round(rgb.b * dimmer/100) },
      ]
    }
  }

  render () {
    return (
      <div className="LEDParCan" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <ColorSketch
          name="color"
          storedValue={(this.props.linkToWash) ? this.props.color : this.state.color}
          handleChange={this.selectColorChange}
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