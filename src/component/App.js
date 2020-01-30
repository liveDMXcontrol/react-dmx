import React, { Component } from 'react';
import './App.css';
import LEDParCan from './LEDParCan';

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
  }

  updateDMX (payload) {
    fetch('http://10.0.1.3:8000', {
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
