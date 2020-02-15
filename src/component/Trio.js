// {
//   name: "Trio",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" },
//   pan: 0,
//   tilt: 0,
//   rotate: 0,
//   dimmer: 0,
//   shutter: 0,
//   zoom: 0,
//   special: 0,
//   movement_macros: 0
// }

import React, { Component } from 'react';
import { Button, ColorSketch, DeviceLabel, Fader, Select, Switch } from './Widget';
import './Trio.css'

export default class Trio extends Component {
  constructor (props) {
    super(props)
    // this.parseToDMX=this.parseToDMX.bind(this)

    this.turnOff=this.turnOff.bind(this)
    this.parseToDMX=this.parseToDMX.bind(this)
    this.state = {
      linkColors: true,
      color1: {rgb: {r: 255, g: 155, b: 0, a: 1}, w: 0},
      color2: {rgb: {r: 255, g: 155, b: 0, a: 1}, w: 0},
      color3: {rgb: {r: 255, g: 155, b: 0, a: 1}, w: 0},
      pan: 75,
      tilt: 65,
      rotate: {type: 0, speed: 0},
      dimmer: 50,
      shutter: {type: 255, speed: 0},
      zoom: 150,
      control: 0,
      movement_macros: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      spinDirection: state.spinDirection,
      dimmer: state.dimmer
    };
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX())
  }

  handleLinkColors = (e) => {
    let newState = this.state
    newState.linkColors = e.target.checked
    this.setState(newState)
  }
  handleColorChange = (e, name) => {
    let newState = this.state
    const scale = (num, in_min=1, in_max=0, out_min=0, out_max=255) => {
      if (num !== 0) {
        return  Math.floor(((num) - in_min) * (out_max - out_min) /
                (in_max - in_min) + out_min);
      } else {
        return 0
      }
    }
    if (!this.state.linkColors) {
      newState[name].rgb = e.rgb
      newState[name].w = scale(e.hsv.s)
    } else {
      newState.color1.rgb =
        newState.color2.rgb =
        newState.color3.rgb = e.rgb
      newState.color1.w=
        newState.color2.w=
        newState.color3.w= scale(e.hsv.s)
    }
    this.setState(newState)
  }
  handleSelectChange = (e) => {
    let newState = this.state
    newState[e.target.name].type = Number(e.target.value)
    this.setState(newState)
  }
  handleSelect = (e, property) => {
    let newState = this.state
    console.log(e.target.value)
    newState[e.target.name][property] = Number(e.target.value)
    this.setState(newState)
  }
  getShutter = () => {
    if (this.state.shutter.type && this.state.shutter.type !== 255) {
      // console.log(this.state.shutter.speed)

      return this.state.shutter.type + (14 - this.state.shutter.speed)
    } else {
      // console.log('false - this.shutter.type: ',this.state.shutter.type)
      return this.state.shutter.type
    }
  }
  getRotate = () => {
    // {text: "clockwise", value: 128},
    // {text: "counterclockwise", value: 192},
    // {text: "small shake", value: 64},
    // {text: "large shake", value: 96},
    // {text: "select position", value: 0}
    switch (this.state.rotate.type) {
      case 0:   // select position
        return 0 + this.state.rotate.speed
      case 128: // clockwise
        return 128 + this.state.rotate.speed
      case 192: // counterclockwise
        return 192 + this.state.rotate.speed
      case 64:  // small shake
        return 64 + Math.floor(this.state.rotate.speed / 2)
      case 96:  // large shake
        return 96 + Math.floor(this.state.rotate.speed / 2)
      default:
        return 0
    }
  }
  turnOff = (e) => {
    e.preventDefault();
    let newState = this.state
    newState.shutter = newState.rotate = 0
    this.setState(newState)
  }
  parseToDMX = () => {
    let channel = this.props.address-1 // just making it a little easier to read the channel assignments relative to manual

    return {
      "channels_list": [
        { "channel": (channel+1),  "value": this.state.pan },
        { "channel": (channel+3),  "value": this.state.tilt },
        { "channel": (channel+6),  "value": this.state.color1.rgb.r},
        { "channel": (channel+7),  "value": this.state.color1.rgb.g},
        { "channel": (channel+8),  "value": this.state.color1.rgb.b},
        { "channel": (channel+9),  "value": this.state.color1.w},
        { "channel": (channel+10), "value": this.state.color2.rgb.r},
        { "channel": (channel+11), "value": this.state.color2.rgb.g},
        { "channel": (channel+12), "value": this.state.color2.rgb.b},
        { "channel": (channel+13), "value": this.state.color2.w},
        { "channel": (channel+14), "value": this.state.color3.rgb.r},
        { "channel": (channel+15), "value": this.state.color3.rgb.g},
        { "channel": (channel+16), "value": this.state.color3.rgb.b},
        { "channel": (channel+17), "value": this.state.color3.w},
        { "channel": (channel+25), "value": this.state.dimmer},
        { "channel": (channel+26), "value": this.getShutter()},
        { "channel": (channel+27), "value": this.state.zoom},
        { "channel": (channel+28), "value": this.state.control},
        { "channel": (channel+29), "value": this.state.movement_macros},
        { "channel": (channel+30), "value": this.getRotate()}
      ]
    }
  }


  render () {
    return (
      <div className="Trio" name={this.props.name}>
      <DeviceLabel
        name={this.props.name}
        />

      <Fader
        name="dimmer"
        min={0}
        max={255}
        storedValue={this.state.dimmer}
        handleChange={(e) => this.props.handleChange(e, this)}
        // onDoubleClick={this.props.resetToZero}
        />
      <div>
        <Fader
          name="pan"
          min={0}
          max={255}
          storedValue={this.state.pan}
          handleChange={(e) => this.props.handleChange(e, this)}
          // onDoubleClick={this.props.resetToZero}
          />
        <Fader
          name="tilt"
          min={0}
          max={255}
          storedValue={this.state.tilt}
          handleChange={(e) => this.props.handleChange(e, this)}
          // onDoubleClick={this.props.resetToZero}
          />
      </div>
      <Fader
        name="zoom"
        min={0}
        max={255}
        storedValue={this.state.zoom}
        handleChange={(e) => this.props.handleChange(e, this)}
        // onDoubleClick={this.props.resetToZero}
        />
      <div>
        <Select
          name="rotate"
          options={[
            {text: "select position", value: 0},
            {text: "clockwise", value: 128},
            {text: "counterclockwise", value: 192},
            {text: "small shake", value: 64},
            {text: "large shake", value: 96}
          ]}
          value={this.state.rotate.type}
          required={true}
          handleChange={(e) => this.handleSelect(e, 'type')}
          />
        <Fader
          name="rotate"
          min={0}
          max={63}
          storedValue={this.state.rotate.speed}
          handleChange={(e) => this.handleSelect(e, 'speed')}
          />
      </div>
      <div>
        <Select
          name="shutter"
          options={[
            {text: "on", value: 255},
            {text: "off", value: 0},
            {text: "fast on, slow off", value: 70},
            {text: "slow on, fast off", value: 90},
            {text: "gradual on/off", value: 210}
          ]}
          value={this.state.shutter.type}
          required={true}
          handleChange={(e) => this.handleSelect(e, 'type')}
          />
        <Fader
          name="shutter"
          min={0}
          max={14}
          storedValue={this.state.shutter.speed}
          handleChange={(e) => this.handleSelect(e, 'speed')}
          />
      </div>
      <ColorSketch
        name="color1"
        disableAlpha={true}
        storedValue={this.state.color1.rgb}
        handleChange={(e) => this.handleColorChange(e, "color1")}
        />
      <ColorSketch
        name="color2"
        disableAlpha={true}
        storedValue={this.state.color2.rgb}
        handleChange={(e) => this.handleColorChange(e, "color2")}
        />
      <ColorSketch
        name="color3"
        disableAlpha={true}
        storedValue={this.state.color3.rgb}
        handleChange={(e) => this.handleColorChange(e, "color3")}
        />
      <Switch
        name="linkColors"
        storedValue={this.state.linkColors}
        handleChange={this.handleLinkColors}
        />
      <Select
        name="control"
        options={[
          {text: "no function", value: 0},
          {text: "blackout while panning/tilting", value: 10},
          {text: "reset pan", value: 50},
          {text: "reset tilt", value: 55},
          {text: "reset zoom", value: 60},
          {text: "reset rotation", value: 65},
          {text: "reset all", value: 70},
          {text: "reverse pan/tilt", value: 80},
          {text: "cancel reverse pan/tilt", value: 105},
          {text: "reverse pan", value: 85},
          {text: "cancel reverse pan", value: 95},
          {text: "reverse tilt", value: 90},
          {text: "cancel reverse tilt", value: 100},
          {text: "pan/tilt slow speed", value: 120},
          {text: "pan/tilt normal speed", value: 110},
          {text: "pan/tilt fast speed", value: 115},
          {text: "fan full speed", value: 125},
          {text: "fan auto speed", value: 130},
          {text: "dimmer fast", value: 135},
          {text: "dimmer smooth", value: 140},
        ]}
        value={this.state.control}
        required={true}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      <Select
        name="movement_macros"
        options={[
          {text: "no function", value: 0},
          {text: "auto 1", value: 8},
          {text: "auto 2", value: 24},
          {text: "auto 3", value: 40},
          {text: "auto 4", value: 56},
          {text: "auto 5", value: 72},
          {text: "auto 6", value: 88},
          {text: "auto 7", value: 104},
          {text: "auto 8", value: 120},
          {text: "sound 1", value: 136},
          {text: "sound 2", value: 152},
          {text: "sound 3", value: 168},
          {text: "sound 4", value: 184},
          {text: "sound 5", value: 200},
          {text: "sound 6", value: 216},
          {text: "sound 7", value: 232},
          {text: "sound 8", value: 248},
        ]}
        value={this.state.movement_macros}
        required={true}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      <Button
        name="trioOff"
        text="off"
        handleClick={this.turnOff}
        />
      </div>
    )
  }
}