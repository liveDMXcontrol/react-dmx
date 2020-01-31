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
    this.state = {
        washColor: "#FFFFFF",
        fxColor: "#FFFFFF",
        spinDirection: 0
      }
  }

  constructDeviceList (devices) {
    return devices.map((device) => (
      <div key={device.name}>
        {device.widget}
      </div>
    ))
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
          color={this.state.washColor}
          handleColorChange={this.props.handeColorChange}
          />
      </div>
    );
  }
}
