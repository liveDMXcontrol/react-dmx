import React, { Component } from 'react';
import './App.css';
import LEDParCan from './LEDParCan';

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
  }

  updateDMX (payload) {
    fetch('http://dmx.local', {
        method: 'post',
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
      </div>
    );
  }
}
