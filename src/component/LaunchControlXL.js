import React, { Component } from 'react'
import WebMidi from 'webmidi'


export default class WebMIDI extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: null,
      output: null
    }
    WebMidi.enable((err) => {
      console.log(WebMidi.outputs)
      let input = WebMidi.getInputByName('Launch Control XL HUI')
      let output = WebMidi.getOutputByName('Launch Control XL HUI')

      output.playNote(32)
    }, true)
  }
  enable () {
    WebMidi.enable(function (err) {

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }
      
    });
  }
  inputs () {
    WebMidi.enable((err) => {
      console.log('enabled')
      console.log(WebMidi.inputs)
    }, true)
  }
  outputs () {
    // return WebMidi.outputs
  }

  render () {
    // this.enable()
    // this.inputs()
    return (

      <div className="WebMIDI">

      </div>
    )
  }
}