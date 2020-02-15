import React, { Component } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'
import './Widget.css'

export class DeviceLabel extends Component {
  render () {
    return (
      <div className="deviceLabel">
        <label>{this.props.name}</label>
      </div>
    )
  }
}

export default class Widget extends Component {
  constructor (props) {
    super(props)

    this.state = {  }
  }

  render () {
    return (
      <div className="Widget">
        <input
          name={this.props.name}
          type={this.props.type}
          className={this.props.class}
          value={this.props.storedValue}
          placeholder={this.props.placeholder}
          checked={this.props.checked}
          min={this.props.min}
          max={this.props.max}
          num={this.props.num}
          orient={this.props.style.orient}
          onChange={this.props.handleChange}
          readOnly={this.props.readOnly}
          onClick={this.props.onClick}
          onDoubleClick={this.props.onDoubleClick}
          onKeyPress={this.props.handleKeyPress}
          />
      </div>)
  }
}
Widget.defaultProps = {
  style: {},
  readOnly: false,
  checked: false
}

export class PropertyLabel extends Component {
  render () {
    return (
      <div className={"PropertyLabel "+this.props.name}>
        <label name={this.props.name}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

export class ValueLabel extends Component {
  render () {
    return (
      <div className={"ValueLabel "+this.props.name}>
        <label name={this.props.name}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

export class NumberSelector extends Component {
  constructor (props) {
    super(props)

    this.state = { num: 0 }
  }

  render () {
    return (
      <div className={"NumberSelector "+this.props.name}>
        <Widget
          name={this.props.name}
          type="range"
          storedValue={this.props.storedValue}
          min={this.props.min}
          max={this.props.max}
          class="numberSelector"
          num={this.state.num}
          style={this.props.style}
          handleChange={this.props.handleChange}
          onDoubleClick={this.props.onDoubleClick}
           />
      </div>
    )
  }
}

export class Button extends Component {
  render () {
    return (
      <div className={"Button "+this.props.name}>
        <Widget
          name={this.props.name}
          storedValue={this.props.text}
          type="button"
          readOnly={true}
          onClick={this.props.handleClick} />
      </div>
    )
  }
}

export class Select extends Component {
  render () {
    let options = this.props.options.map((option) => {
      return (
        <option value={option.value} key={option.text}>{option.text}</option>)
    })
    return (
      <div className={"Select "+this.props.name}>
        <select
          name={this.props.name}
          value={this.props.storedValue}
          onChange={this.props.handleChange}
          >
            {options}
        </select>
      </div>
    )
  }
}

export class Switch extends Component {
  render () {
    return (
      <div className={"Switch "+this.props.name}>
        <Widget
          type="checkbox"
          name={this.props.name}
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.defaultValue}
          checked={this.props.storedValue}
          handleChange={this.props.handleChange}
          onDoubleClick={this.props.onDoubleClick} />
      </div>
    )
  }
}

export class ColorCircle extends Component {
  render () {
    return (
      <div className={"Color ColorCircle "+this.props.name}>
        <CirclePicker
          name={this.props.name}
          color={this.props.storedValue}
          onChange={this.props.handleChange}
          disableAlpha={true}
          colors={[ "#F00", "#0F0", "#00F",
                    "#FF0", "#F0F", "#0FF",
                    "#FFF"]}
          circleSize={42}
          circleSpacing={24}
          />
      </div>
    )
  }
}
export class ColorSketch extends Component {
  render () {
    return (
      <div className={"Color ColorSketch "+this.props.name}>
        <SketchPicker
          name={this.props.name}
          color={this.props.storedValue}
          onChange={this.props.handleChange}
          disableAlpha={this.props.disableAlpha}
          presetColors={["#F00", "#0F0", "#00F", "#FF0", "#F0F", "#0FF", "#FFF", "#000",
                         "#F90", "#F09", "#0F9", "#9F0", "#90F", "#09F", "#999", "#333"]}
          />
      </div>
    )
  }
}
ColorSketch.defaultProps = {
  disableAlpha: true
}

// export class Knob extends Component {
//   render () {
//     return (
//       <div className="Knob">
//         <NumberSelector
//           name={this.props.name}
//           storedValue={this.props.storedValue}
//           min="-50"
//           max="50"
//           handleChange={this.props.handleChange}
//           style={this.props.style}
//           />
//       </div>
//     )
//   }
// }

export class Fader extends Component {
  render () {
    return (
      <div className={"Fader "+this.props.name}>
        {/*this.props.propertyName*/}
        <NumberSelector
          name={this.props.name}
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.defaultValue}
          storedValue={this.props.storedValue}
          handleChange={this.props.handleChange}
          onDoubleClick={this.props.onDoubleClick}
          />
        <ValueLabel
          name={this.props.name+"ValueLabel"}
          label={this.props.name+": "+this.props.storedValue}
          />
      </div>
    )
  }
}
Fader.defaultProps = {
  min: 0,
  max: 100,
  defaultValue: 0
}

export class KeyboardControl extends Component {
  render () {
    return (
      <div className="KeyboardControl">
        <Widget 
          readOnly={true}
          handleKeyPress={this.props.handleKeyPress}
          storedValue=""
          placeholder={this.props.name}
          />
      </div>
    )
  }
}
