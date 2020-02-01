import React, { Component } from 'react';
import { ColorSketch, DeviceLabel } from './Widget';
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

  parseToDMX = (rgb, dimmer) => {
    // take a rgb value and break it up into dmx messages
    // console.log(this.props)
    let address = this.props.address

    return {
      "channels_list": [
        { "channel": (address),     "value": (rgb.r * 100/dimmer) },
        { "channel": (address + 1), "value": (rgb.g * 100/dimmer) },
        { "channel": (address + 2), "value": (rgb.b * 100/dimmer) },
      ]
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      color: props.color,
    };

  }
  shouldComponentUpdate(nextProps) {
    return (this.props.color !== nextProps.color ||
            this.props.masterDimmer !== nextProps.masterDimmer)
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX(
        this.props.color, this.props.masterDimmer))
  }

  render () {
    return (
      <div className="LEDParCan" name={this.props.name}>
        <DeviceLabel
          name={this.props.name}
          />
        <ColorSketch
          name="color"
          storedValue={this.props.color}
          handleChange={(e) => this.props.handleColorChange(e, this.parseToDMX)}
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