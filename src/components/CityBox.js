import React, { Component } from "react";
import "./main.css";

class CityBox extends Component {
  render() {
    return (
      <div className="city-box-container">
        <label>
          <input
            type="checkbox"
            name={this.props.name}
            id={this.props.id}
            checked={this.props.checked}
            onChange={this.props.onChange}
          />
          <span>{this.props.name}</span>
        </label>
      </div>
    );
  }
}

export default CityBox;
