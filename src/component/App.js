import React, { Component } from 'react';
import './App.css';
import LEDParCan from './LEDParCan';

// devices: [
//   {name: "LEDParCan1",
//     widget: <LEDParCan name="LEDParCan1" updateDMX={this.updateDMX} />},
//   {name: "LEDParCan2",
//     widget: <LEDParCan name="LEDParCan2" updateDMX={this.updateDMX} />
// }
// ]

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
    this.handleWashColorChange = this.handleWashColorChange.bind(this)
    this.state = {
        washColor: {r: 255, g: 255, b: 255, a: 1},
        fxColor: {r: 255, g: 255, b: 255, a: 1},
        spinDirection: 0,
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
  handleChange = (e, parseToDMX) => {
    let newState = this.state
    newState[e.target.name].value = e.target.value
    this.setState(newState)

    this.props.updateDMX(parseToDMX(this.state.color))
  }
  handleWashColorChange = (e, parseToDMX) => {
    let newState = this.state
    newState.washColor = e.rgb
    this.setState(newState)

    this.updateDMX(parseToDMX(this.state.washColor))
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
          address={50}
          color={this.state.washColor}
          handleColorChange={this.handleWashColorChange}
          updateDMX={this.updateDMX}
          />
      </div>
    )
  }
}
