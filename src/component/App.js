import React, { Component } from 'react';
import './App.css';
import LEDParCan from './LEDParCan';

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
  }

  updateDMX (payload) {
    console.log('updateDMX')
    payload =
    {
      "channels_list": [
        {"channel": 50, "value": Math.floor(Math.random() * Math.floor(255))},
        {"channel": 51, "value": Math.floor(Math.random() * Math.floor(255))},
        {"channel": 52, "value": Math.floor(Math.random() * Math.floor(255))}
      ]
    }
    console.log(payload)

    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    ).then(response => console.log(response.status))
  }

  render() {
    return (
      <div className="App">
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
        <LEDParCan updateDMX={this.updateDMX} />
      </div>
    );
  }
}
