import React from "react";

import "./MainContainer.css";
import citiesData from "../citiesData";
import CityCard from "../components/CityCard";
import CityBox from "../components/CityBox";

const axios = require("axios");
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = `http://api.openweathermap.org/data/2.5/group?id=ids&APPID=${API_KEY}`;

class MainContainer extends React.Component {
  constructor() {
    super();
    Object.keys(citiesData).forEach(key => {
      citiesData[key] = { ...citiesData[key], checked: false };
    });
    this.state = {
      cities: { ...citiesData }
    };
  }

  handleCheckBox = e => {
    e.persist();
    this.setState(prevState => {
      const cloned = { ...prevState.cities };
      cloned[e.target.id].checked = !cloned[e.target.id].checked;
      return {
        cities: { ...cloned }
      };
    });
  };

  updateTemp = (temperatures = null) => {
    if (temperatures == null) {
      temperatures = {};
    }
    this.setState(prevState => {
      const cloned = { ...prevState.cities };
      Object.entries(cloned).forEach(([key, value]) => {
        if (value.checked == true && !(key in temperatures)) {
          value.temperature = "Not Found";
        } else if (value.checked == true) {
          value.temperature =
            Math.round(temperatures[key].temp - 274.15) + "°C"; // Celsius = Kelvin - 274.15
        } else {
          value.temperature = undefined;
        }
      });
      return {
        cities: { ...cloned }
      };
    });
  };

  handleSubmit = () => {
    const ids = Object.entries(this.state.cities)
      .filter(([key, value]) => value.checked)
      .map(([key, value]) => {
        return key;
      })
      .toString();

    const current_url = BASE_URL.replace("ids", ids);
    const temperatures = {};
    axios
      .get(current_url)
      .then(res => {
        res.data.list.map(item => {
          temperatures[item.id] = { temp: item.main.temp };
        });
        this.updateTemp(temperatures);
      })
      .catch(err => {
        console.log(err);
        this.updateTemp();
      });
  };

  render() {
    return (
      <div>
        <h4>Weather</h4>
        {Object.entries(citiesData).map(([key, value]) => (
          <div className="row" key={key}>
            <div className="col s12 m6">
              <div className="myCard">
                <CityBox
                  name={value.name}
                  id={key}
                  checked={value.checked}
                  onChange={this.handleCheckBox}
                ></CityBox>
                <CityCard temperature={value.temperature}></CityCard>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={this.handleSubmit}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

export default MainContainer;
