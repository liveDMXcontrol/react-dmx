import React, { Component } from 'react'
import './App.css'
import LEDParCan from './LEDParCan'
import FourBar from './FourBar'
import TriLED from './TriLED'
import Mushroom from './Mushroom'
import Trio from './Trio'
// import DimmerPack from './DimmerPack'
import Control from './Control'
// import WebMIDI from './LaunchControlXL'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleWashColorChange = this.handleWashColorChange.bind(this)
    this.handleFXColorChange = this.handleFXColorChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.resetToZero = this.resetToZero.bind(this)
    this.setWash = this.setWash.bind(this)
    this.state = {
        masterDimmer: 100,
        washColor: {r: 255, g: 255, b: 255, a: 1},
        linkToWash: true,
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
  handleChange = (e, thisthis=this) => {
    let newState = thisthis.state
    newState[e.target.name] = Number(e.target.value)
    thisthis.setState(newState)
  }
  handleColorChange = (e, thisthis=this) => {
    let newState = thisthis
    newState.color = e.rgb
    thisthis.setState(newState)
    this.handleWashColorChange(e)
  }
  handleWashColorChange = (e, thisthis=this) => {
    let newState = this.state
    newState.washColor = e.rgb
    this.setState(newState)
  }
  handleFXColorChange = (e) => {
    let newState = this.state
    newState.fxColor = e.rgb
    this.setState(newState)
  }
  handleCheckbox (e, thisthis=this) {
    let newState = thisthis.state
    newState[e.target.name] = e.target.checked
    thisthis.setState(newState)
    console.log(this.state[e.target.name])
  }
  resetToZero = (e, thisthis=this) => {
    let newState = thisthis.state
    newState['fxSpinDirection'] = 0
    newState['fxDimmer'] = 0
    thisthis.setState(newState)
  }
  setWash (rgb) {
    // links colors to wash color
    // then sets new wash color in app state

    let newState = this.state
    newState.linkToWash=true
    newState.washColor=rgb
    this.setState(newState)
  }

  updateDMX (payload) {
    // console.log(payload)
    // return false

    fetch('http://dmx.local/api', {
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
          linkToWash={this.state.linkToWash}
          handleColorChange={this.handleColorChange}
          handleWashColorChange={this.handleWashColorChange}
          masterDimmer={this.state.masterDimmer}
          updateDMX={this.updateDMX}
          />
        <FourBar
          name="4Bar1"
          address={64}
          color={this.state.washColor}
          linkToWash={this.state.linkToWash}
          handleColorChange={this.handleColorChange}
          handleWashColorChange={this.handleWashColorChange}
          masterDimmer={this.state.masterDimmer}
          updateDMX={this.updateDMX}
          />
        <FourBar
          name="4Bar2"
          address={79}
          color={this.state.washColor}
          linkToWash={this.state.linkToWash}
          handleColorChange={this.handleColorChange}
          handleWashColorChange={this.handleWashColorChange}
          masterDimmer={this.state.masterDimmer}
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
        <Mushroom
          name="Mushroom"
          address={136}
          handleChange={this.handleChange}
          resetToZero={this.resetToZero}
          updateDMX={this.updateDMX}
          />
        <Trio
          name="Trio"
          address={1}
          handleChange={this.handleChange}
          handleCheckbox={this.handleCheckbox}
          resetToZero={this.resetToZero}
          updateDMX={this.updateDMX}
          washColor={this.state.washColor}
          />
        <Control 
          name="masterControl"
          masterDimmer={this.state.masterDimmer}
          linkToWash={this.state.linkToWash}
          handleChange={this.handleChange}
          handleCheckbox={this.handleCheckbox}
          setWash={this.setWash}
          updateDMX={this.updateDMX}
          />
        {/* <WebMIDI /> */}
        { /* <DimmerPack
          name="DimmerPack"
          address={509}
          handleChange={this.handleChange}
          updateDMX={this.updateDMX}
          /> */ }
      </div>
    )
  }
}
