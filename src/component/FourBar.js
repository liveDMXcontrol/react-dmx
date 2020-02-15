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
    this.selectColorChange=this.selectColorChange.bind(this)

    this.state = {
      fader: { value: "50", style: { orient: "horizontal" }, property: "brightness" },
      color: {r: 255, g: 255, b: 255, a: 1}
    }

    // this.handleColorChange = this.handleColorChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('link: ', props.linkToWash)
    return {
      externalData: null,
      color: (props.linkToWash) ? props.color : state.color,
    };
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX(
        this.state.color, this.props.masterDimmer))
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
    let address = this.props.address

    const scale = (num, in_min=0, in_max=100, out_min=9, out_max=255) => {
      if (num !== 0) {
        return  Math.floor(((num) - in_min) * (out_max - out_min) /
                (in_max - in_min) + out_min);
      } else {
        return 0
      }
    }

    // console.log({
    //   "channels_list": [
    //     { "channel": address,        "value": Number(rgb.r * 100/dimmer) },
    //     { "channel": (address + 1),  "value": Number(rgb.g * 100/dimmer) },
    //     { "channel": (address + 2),  "value": Number(rgb.b * 100/dimmer) },
    //     { "channel": (address + 3),  "value": Number(rgb.r * 100/dimmer) },
    //     { "channel": (address + 4),  "value": Number(rgb.g * 100/dimmer) },
    //     { "channel": (address + 5),  "value": Number(rgb.b * 100/dimmer) },
    //     { "channel": (address + 6),  "value": Number(rgb.r * 100/dimmer) },
    //     { "channel": (address + 7),  "value": Number(rgb.g * 100/dimmer) },
    //     { "channel": (address + 8),  "value": Number(rgb.b * 100/dimmer) },
    //     { "channel": (address + 9),  "value": Number(rgb.r * 100/dimmer) },
    //     { "channel": (address + 10), "value": Number(rgb.g * 100/dimmer) },
    //     { "channel": (address + 11), "value": Number(rgb.b * 100/dimmer) },
    //   ]
    // })

    return {
      "channels_list": [
        { "channel": (address + 0),  "value": 0 }, // control/operating mode
        { "channel": (address + 1),  "value": scale(dimmer) },
        { "channel": (address + 2),  "value": 0 }, // strobe
        { "channel": (address + 3),  "value": Number(rgb.r) },
        { "channel": (address + 4),  "value": Number(rgb.g) },
        { "channel": (address + 5),  "value": Number(rgb.b) },
        { "channel": (address + 6),  "value": Number(rgb.r) },
        { "channel": (address + 7),  "value": Number(rgb.g) },
        { "channel": (address + 8),  "value": Number(rgb.b) },
        { "channel": (address + 9),  "value": Number(rgb.r) },
        { "channel": (address + 10), "value": Number(rgb.g) },
        { "channel": (address + 11), "value": Number(rgb.b) },
        { "channel": (address + 12), "value": Number(rgb.r) },
        { "channel": (address + 13), "value": Number(rgb.g) },
        { "channel": (address + 14), "value": Number(rgb.b) },
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