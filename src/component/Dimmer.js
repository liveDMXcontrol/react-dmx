// {
//   name: "Dimmer",
//   widget: null,
//   address: null,
//   dimmer: { 1: { value: 0, mode: "0" }, 2: { value: 0, mode: "0" }, 3: { value: 0, mode: "0" }, 4: { value: 0, mode: "0" } } // 0 == fader, 1 == boolean off/on
// }

import React, { Component } from 'react';
import { DeviceLabel, Fader, Switch } from './Widget';
import './Dimmer.css'

export default class Dimmer extends Component {
  constructor (props) {
    super(props)
    // this.parseToDMX=this.parseToDMX.bind(this)

    this.state = {
      dimmer1: 0,
      dimmer2: 0,
      dimmer3: 0,
      dimmer4: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      dimmer1: state.dimmer1,
      dimmer2: state.dimmer2,
      dimmer3: state.dimmer3,
      dimmer4: state.dimmer4
    };
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX())
  }

  parseToDMX = () => {
    let address = this.props.address

    return {
      "channels_list": [
        { "channel": address+0, "value": this.state.dimmer1 },
        { "channel": address+1, "value": this.state.dimmer2 },
        { "channel": address+2, "value": this.state.dimmer3 },
        { "channel": address+3, "value": this.state.dimmer4 },
      ]
    }

  }


  render () {
    return (
      <div className="Dimmer" name={this.props.name}>
      <DeviceLabel
        name={this.props.name}
        />
      <Fader
        name="dimmer1"
        min={0}
        max={255}
        storedValue={this.state.dimmer1}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      <Fader
        name="dimmer2"
        min={0}
        max={255}
        storedValue={this.state.dimmer2}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      <Fader
        name="dimmer3"
        min={0}
        max={255}
        storedValue={this.state.dimmer3}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      <Fader
        name="dimmer4"
        min={0}
        max={255}
        storedValue={this.state.dimmer4}
        handleChange={(e) => this.props.handleChange(e, this)}
        />
      </div>
    )
  }
}