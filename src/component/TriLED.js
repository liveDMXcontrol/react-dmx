// {
//   name: "TriLED",
//   widget: null,
//   address: null,
//   color: { value: "#FFFFFF" },
//   spin: 0,
//   dimmer: 0
// }

import React, { Component } from 'react';
import { Button, ColorCircle, DeviceLabel, Fader } from './Widget';
import './TriLED.css'

export default class TriLED extends Component {
  constructor (props) {
    super(props)
    // this.parseToDMX=this.parseToDMX.bind(this)

    this.turnOff=this.turnOff.bind(this)
    this.state = {
      // dimmer: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      externalData: null,
      color: props.color,
      spinDirection: props.spinDirection,
      dimmer: props.dimmer
    };
  }
  shouldComponentUpdate(nextProps) {
    return (this.props.color !== nextProps.color ||
      this.props.spinDirection !== nextProps.spinDirection ||
      this.props.dimmer !== nextProps.dimmer)
  }
  componentDidUpdate(prevProps) {
    this.props.updateDMX(
      this.parseToDMX())
  }

  turnOff = (e, address) => {
    e.preventDefault();
    let name = e.target.name
    e.target.name="spinDirection"
    this.props.resetToZero(e, this)
    e.target.name="dimmer"
    this.props.resetToZero(e, this)
    e.target.name=name
  }
  parseToDMX = (rgb=this.props.color) => {
    // take a rgb value and break it up into dmx messages
    let address = this.props.address

    if (this.props.TriLEDColor === "white" ) {
      console.log('white')
      let color = 0
      /*
      0   - b
      17  -     g
      34  -         w
      51  -             r
      68  - b + g
      85  - b +     w
      102 - b +         r
      119 -     g + w
      136 -     g +     r
      153 -         w + r
      170 - b + g + w
      187 - b + g +     r
      204 - b +     w + r
      221 -     g + w + r
      238 - b + g + w + r
      */
      /*
      r   g   b  g+b r+b r+g  r+g+b
      r   g   b  g+b r+b r+g r+g+b+w
      */
      if (rgb.r) {
        if (rgb.g) {
          if (rgb.b) {
            color=238
          } else {
            color=136
          }
        } else if (rgb.b) {
          color=102
        } else {
          color=51
        }
      } else if (rgb.g) {
        if (rgb.b) {
          color=68
        } else {
          color=17
        }
      } else {
        color=0
      }
      return {
        "channels_list": [
          { "channel": address,     "value": this.props.dimmer },
          { "channel": (address+1), "value": color },
          { "channel": (address+2), "value": this.props.spinDirection }
        ]
      }
    } else {
      let color = null
      /*
      160 - r
      0   -     g
      80  -         b
      200 - r + g
      120 - r +     b
      48  -     g + b
      255 - r + g + b
      */
      if (rgb.r) {
        if (rgb.g) {
          if (rgb.b) {
            color=255 // white
          } else {
            color=200 // yellow
          }
        } else if (rgb.b) {
          color=120 // magenta
        } else {
          color=160 // red
        }
      } else if (rgb.g) {
        if (rgb.b) {
          color=40 // cyan
        } else {
          color=0 // green
        }
      } else {
        color=80 // blue
      }

      return {
        "channels_list": [
          { "channel": address,     "value": this.props.dimmer }, // spin
          { "channel": (address+1), "value": color },                    // color
          { "channel": (address+2), "value": this.props.spinDirection }       // dimmer
        ]
      }

    }
  }


  render () {
    return (
      <div className="TriLED" name={this.props.name}>
      <DeviceLabel
        name={this.props.name}
        />
      <ColorCircle
        name="color"
        storedValue={this.props.color}
        handleChange={this.props.handleColorChange}
        />
      <Fader
        name="fxSpinDirection"
        min={10}
        max={245}
        defaultValue={7}
        storedValue={this.props.spinDirection}
        handleChange={this.props.handleChange}
        onDoubleClick={this.props.resetToZero}
        />
      <Fader
        name="fxDimmer"
        min={8}
        max={199}
        defaultValue={8}
        storedValue={this.props.dimmer}
        handleChange={this.props.handleChange}
        onDoubleClick={this.props.resetToZero}
        />
      <Button
        name="spinnyOff"
        text="off"
        handleClick={this.turnOff}
        />
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