import React from "react";
import "./main.css";

class CityCard extends React.Component {
  render() {
    return <div className="city-card-container">{this.props.temperature}</div>;
  }
}

export default CityCard;
