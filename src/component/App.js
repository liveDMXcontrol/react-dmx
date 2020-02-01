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
        masterDimmer: 100,
        washColor: {r: 255, g: 255, b: 255, a: 1},
        fxColor: {r: 0, g: 0, b: 0, a: 1},
        fxSpinDirection: 0,
        fxDimmer: 0
      }
  }

  constructDeviceList (devices) {
    return devices.map((device) => (
      <div key={device.name}>
        {device.widget}
      </div>
    ))
  }
  handleChange = (e) => {
    let newState = this.state
    newState[e.target.name] = Number(e.target.value)
    this.setState(newState)
  }
  handleWashColorChange = (e) => {
    let newState = this.state
    newState.washColor = e.rgb
    this.setState(newState)
  }
  handleFXColorChange = (e) => {
    let newState = this.state
    newState.fxColor = e.rgb
    this.setState(newState)
  }
  resetToZero = (e) => {
    let newState = this.state
    newState['fxSpinDirection'] = 0
    newState['fxDimmer'] = 0
    this.setState(newState)
  }

  updateDMX (payload) {
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
          address={145}
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
          name="TriLED_b"
          TriLEDColor="black"
          address={130}
          color={this.state.fxColor}
          spinDirection={this.state.fxSpinDirection}
          dimmer={this.state.fxDimmer}
          handleColorChange={this.handleFXColorChange}
          handleChange={this.handleChange}
          resetToZero={this.resetToZero}
          updateDMX={this.updateDMX}
          />
        <TriLED
          name="TriLED_w"
          TriLEDColor="white"
          address={133}
          color={this.state.fxColor}
          spinDirection={this.state.fxSpinDirection}
          dimmer={this.state.fxDimmer}
          handleColorChange={this.handleFXColorChange}
          handleChange={this.handleChange}
          resetToZero={this.resetToZero}
          updateDMX={this.updateDMX}
          />
      </div>
    )
  }
}
