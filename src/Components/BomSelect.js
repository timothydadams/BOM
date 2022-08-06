import React, { Component } from "react";

import Select from "react-select";

export default class BomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newSelection) {
    console.log("___ multi: ", newSelection);
    this.setState({
      value: newSelection
    });
  }

  render() {
    const components = {
      MultiValueContainer: ({ selectProps, data }) => {
        const values = selectProps.value;
        if (values) {
          return values[values.length - 1].label === data.label
            ? data.label
            : data.label + ", ";
        } else return "";
      }
    };

    return (
      <Select
        value={this.state.value}
        onChange={this.handleChange}
        options={props.options}
        isMulti
        name={this.props.name}
        className="basic-multi-select"
        classNamePrefix="select"
        components={components}
      />
    );
  }
}
