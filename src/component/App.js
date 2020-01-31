import React, { Component } from 'react';
import './App.css';
import LEDParCan from './LEDParCan';
import FourBar from './FourBar';
import TriLED from './TriLED';

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleWashColorChange = this.handleWashColorChange.bind(this)
    this.handleFXColorChange = this.handleFXColorChange.bind(this)
    this.resetToZero = this.resetToZero.bind(this)
    this.state = {
        washColor: {r: 255, g: 255, b: 255, a: 1},
        fxColor: {r: 0, g: 0, b: 0, a: 1},
        spinDirection: 0,
        fxDimmer: 0,
        masterDimmer: 100
      }
  }

  constructDeviceList (devices) {
    return devices.map((device) => (
      <div key={device.name}>
        {device.widget}
      </div>
    ))
  }
  handleChange = (e, channel) => {
    let newState = this.state
    newState[e.target.name] = Number(e.target.value)
    this.setState(newState)

    this.updateDMX(
        { "channels_list": [
          {channel: channel, value: Number(e.target.value)}
        ]}
      )
  }
  handleWashColorChange = (e, parseToDMX) => {
    let newState = this.state
    newState.washColor = e.rgb
    this.setState(newState)

    console.log(parseToDMX(this.state.washColor, this.state.masterDimmer))
    this.updateDMX(parseToDMX(this.state.washColor, this.state.masterDimmer))
  }
  handleFXColorChange = (e, parseToDMX) => {
    let newState = this.state
    newState.fxColor = e.rgb
    this.setState(newState)

    this.updateDMX(parseToDMX(this.state.washColor))
  }
  resetToZero = (e, channel) => {
    let newState = this.state
    newState[e.target.name] = 0
    this.setState(newState)

    this.updateDMX(
      { "channels_list": [
        {channel: channel, value: 0}
      ]}
    )
  }

  updateDMX (payload) {
    console.log(payload)
    fetch('http://kara.local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    ).then(response => console.log(response.status))
  }

  render () {
    return (
      <div className="App">
        <LEDParCan
          name="LEDParCan"
          address={50}
          color={this.state.washColor}
          handleColorChange={this.handleWashColorChange}
          masterDimmer={this.state.masterDimmer}
          updateDMX={this.updateDMX}
          />
        <FourBar
            name="4Bar1"
            address={64}
            color={this.state.washColor}
            handleColorChange={this.handleWashColorChange}
            updateDMX={this.updateDMX}
            />
        <FourBar
            name="4Bar2"
            address={79}
            color={this.state.washColor}
            handleColorChange={this.handleWashColorChange}
            updateDMX={this.updateDMX}
            />
          <TriLED
            name="TriLED_w"
            TriLEDColor="black"
            address={0}
            color={this.state.fxColor}
            spinDirection={this.state.spinDirection}
            fxDimmer={this.state.fxDimmer}
            handleColorChange={this.handleFXColorChange}
            handleChange={this.handleChange}
            resetToZero={this.resetToZero}
            />
          <TriLED
            name="TriLED_b"
            TriLEDColor="white"
            address={0}
            color={this.state.fxColor}
            spinDirection={this.state.spinDirection}
            fxDimmer={this.state.fxDimmer}
            handleColorChange={this.handleFXColorChange}
            handleChange={this.handleChange}
            resetToZero={this.resetToZero}
            />
      </div>
    )
  }
}
