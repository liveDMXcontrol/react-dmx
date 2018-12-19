import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)

    this.updateDMX = this.updateDMX.bind(this)
  }

  updateDMX () {
    console.log('updateDMX')
    let payload =
    {
      "channels_list": [
        {"channel": 50, "value": 255},
        {"channel": 51, "value": 0},
        {"channel": 52, "value": 0}
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
        <input
          type="button"
          value="click me"
          onClick={this.updateDMX} />
      </div>
    );
  }
}

export default App;
