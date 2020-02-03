// {
//   name: "Mush",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" },
//   spin: 0,
//   dimmer: 0
// }

// {
//   name: "Mushroom",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" },
//   spin: 0,
//   dimmer: 0
// }

import React, { Component } from 'react';
import { Button, DeviceLabel, Fader, Switch } from './Widget';
import './Mushroom.css'

export default class Mushroom extends Component {
  constructor (props) {
    super(props)
    // this.parseToDMX=this.parseToDMX.bind(this)

    this.turnOff=this.turnOff.bind(this)
    this.parseToDMX=this.parseToDMX.bind(this)
    this.state = {
      spinDirection: 0,
      dimmer: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      spinDirection: state.spinDirection,
      dimmer: state.dimmer
    };
  }
  shouldComponentUpdate(nextProps) {
    return (this.state.spinDirection !== nextProps.spinDirection ||
            this.state.dimmer !== nextProps.dimmer)
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX())
  }

  handleDimmer = (e) => {
    let checked = e.target.checked

    if (checked) {
      this.setState({dimmer: 1})
    } else {
      this.setState({dimmer: 0})
    }
  }
  turnOff = (e, address) => {
    e.preventDefault();
    let name = e.target.name
    e.target.name="spinDirection"
    this.props.resetToZero(e, address)
    e.target.name="dimmer"
    this.props.resetToZero(e, address+1)
    e.target.name=name
  }
  parseToDMX = () => {
    let address = this.props.address
    console.log('address: ', address)

    console.log('dimmer: ', this.state.dimmer)
    console.log('spinDirection', this.state.spinDirection)
    return {
      "channels_list": [
        { "channel": address,     "value": this.state.dimmer+14 },
        { "channel": (address+1), "value": this.state.spinDirection },
      ]
    }
  }


  render () {
    return (
      <div className="Mushroom" name={this.props.name}>
      <DeviceLabel
        name={this.props.name}
        />

      <Fader
        name="spinDirection"
        min={0}
        max={170}
        defaultValue={85}
        storedValue={this.state.spinDirection}
        handleChange={(e) => this.props.handleChange(e, this)}
        onDoubleClick={(e) => this.props.resetToZero(e, this)}
        />
      <Switch
        name="dimmer"
        storedValue={this.state.dimmer}
        handleChange={this.handleDimmer}
        onDoubleClick={(e) => this.props.resetToZero(e, this)}
       />

      {/*<Button
        name="spinnyOff"
        text="off"
        handleClick={this.turnOff}
        />*/}
      </div>
    )
  }
}

        // <Knob
        //   name="knob1"
        //   storedValue={this.state.knob1.value}
        //   style={this.state.knob1.style}
        //   handleChange={this.handleChange} />
        // <Knob
        //   name="knob2"
        //   storedValue={this.state.knob2.value}
        //   style={this.state.knob2.style}
        //   handleChange={this.handleChange} />
        // <Fader
        //   name="fader"
        //   storedValue={this.state.fader.value}
        //   style={this.state.fader.style}
        //   handleChange={this.handleChange} />