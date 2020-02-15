import React, { Component } from 'react';
import { Fader, KeyboardControl, Switch } from './Widget';
import './Control.css'

// rework this to general "utilities"
// include linkToWash control

export default class Control extends Component {
  constructor (props) {
    super(props)

    this.parseToDMX=this.parseToDMX.bind(this)
    this.handleFormChange=this.handleFormChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleKeyPress=this.handleKeyPress.bind(this)

    this.state = {
      sendChannel: 0,
      sendValue: 0
    }
  }

  parseToDMX (e) {
    let payload = {
      "channels_list": [
        { "channel": e.target[0].value, "value": e.target[1].value }
      ]
    }
    this.props.updateDMX(payload)
  }
  handleFormChange (e) {
    let newState = this.state
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }
  handleSubmit (e) {
    e.preventDefault();
    this.parseToDMX(e)
  }
  handleKeyPress (e) {
    let rgb = {r: 0, g: 0, b: 0, a: 1}
    switch (e.key) {
      case 'q':
        rgb.r = 255*this.props.masterDimmer/100
        break
      case 'w':
        rgb.g = 255*this.props.masterDimmer/100
        break
      case 'e':
        rgb.b = 255*this.props.masterDimmer/100
        break
      case 'a':
        rgb.r = 255*this.props.masterDimmer/100
        rgb.g = 255*this.props.masterDimmer/100
        break
      case 's':
        rgb.g = 255*this.props.masterDimmer/100
        rgb.b = 255*this.props.masterDimmer/100
        break
      case 'd':
        rgb.b = 255*this.props.masterDimmer/100
        rgb.r = 255*this.props.masterDimmer/100
        break
      case ' ':
        break
      case 'Enter':
        rgb.r = 255*this.props.masterDimmer/100
        rgb.g = 255*this.props.masterDimmer/100
        rgb.b = 255*this.props.masterDimmer/100
        break
      default:
        console.log(e.key)
        break
    }
    this.props.setWash(rgb)
  }

  render () {
    return (
      <div className="Control">
        <form onSubmit={this.handleSubmit}>
          <label>channel
          <input 
            name={"sendChannel"}
            value={this.state.sendChannel}
            onChange={this.handleFormChange}
            /></label>
          <label>value
          <input 
            name={"sendValue"}
            value={this.state.sendValue}
            onChange={this.handleFormChange}
            /></label>
          <input type="submit" value="go" />
        </form>
        <Fader
          name="masterDimmer"
          storedValue={this.props.masterDimmer}
          handleChange={this.props.handleChange}
          />
        <label>link wash colors
        <Switch 
          name="linkToWash"
          storedValue={this.props.linkToWash}
          defaultValue={true}
          handleChange={this.props.handleCheckbox}
          /></label>
        <KeyboardControl 
          name="KeyboardControl"
          handleKeyPress={this.handleKeyPress}
          />
      </div>
    )
  }
}