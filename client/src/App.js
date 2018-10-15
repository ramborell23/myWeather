import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "./Stylesheets/main.css";
import axios from 'axios'
import weatherFunctions from "./WeatherFunctions/functions.js";
var moment = require("moment-timezone");
// var moment = require("moment-timezone");
const dotenv = require("dotenv");
dotenv.config();
const sessionToken = Math.floor(Math.random() * 9999999999) + 1000000000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      searchbar: "",
      locationTitle: "",
      // locationLongtitude: '',
      // locationLattitude: '',
      cloudCover: "",
      humidity: "",
      temperature: "",
      sunrise: "",
      sunset: "",
      weatherDescription: "",
      windSpeed: "",
      windDirection: "",
      airPressure: "",
      momentTimezoneCity: "",
      momentTimezoneCountry: "",
      googleAutocomplete: [],
      // googleAutocompleteSelection: ""
      
    };
  }
  

  getWeather = () => {
    const { searchbar } = this.state;
    let locationLattitude = "";
    let locationLongtitude = "";
    let fiveDayHashTable = {};
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchbar}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        let googleGeo = res.data.results[0];
        let googleGeoLocationArr = googleGeo.address_components;
        console.log(googleGeo);
        this.setState({
          locationTitle: googleGeo.formatted_address,
          momentTimezoneCity: googleGeo.address_components,
          momentTimezoneCountry: googleGeoLocationArr[googleGeoLocationArr.length - 1]
        });
        // console.log(this.momentTimezoneCountry)
        locationLattitude = googleGeo.geometry.location.lat;
        locationLongtitude = googleGeo.geometry.location.lng;
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${locationLattitude}&lon=${locationLongtitude}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
          .then(res => {
            let weatherInfo = res.data;
            this.setState({
              cloudCover: weatherInfo.clouds.all,
              humidity: weatherInfo.main.humidity,
              temperature: weatherInfo.main.temp,
              sunrise: weatherInfo.sys.sunrise,
              sunset: weatherInfo.sys.sunset,
              weatherDescription: weatherInfo.weather[0].description,
              windSpeed: weatherInfo.wind.speed,
              windDirection: weatherInfo.wind.deg,
              airPressure: weatherInfo.main.pressure
            });
            axios
              .get(`http://api.openweathermap.org/data/2.5/forecast?lat=${locationLattitude}&lon=${locationLongtitude}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
              .then(res => {
                let fiveDayForecast = res.data.list;
                for (let i = 0; i < fiveDayForecast.length; i++) {
                  let forecastIndexValue = fiveDayForecast[i]["dt_txt"].slice(
                    0,
                    10
                  );
                  if (
                    fiveDayHashTable.hasOwnProperty(
                      fiveDayForecast[i]["dt_txt"].slice(0, 10)
                    )
                  ) {
                    fiveDayHashTable[
                      fiveDayForecast[i]["dt_txt"].slice(0, 10)
                    ] = [
                      ...fiveDayHashTable[forecastIndexValue],
                      fiveDayForecast[i]
                    ];
                  } else {
                    fiveDayHashTable[
                      fiveDayForecast[i]["dt_txt"].slice(0, 10)
                    ] = [fiveDayForecast[i]];
                  }
                }
                // console.log('TEMP ARR+++>',tempArr);
                console.log("fiveDayHashTable====>", fiveDayHashTable);
                this.setState({});
              })
              .catch(function(error) {
                console.log(error);
              });
            console.log(weatherInfo);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleAutoComplete = (event) => {
    const { searchbar } = this.state;
    let inputValue = ""
    //Check if person is typing or clicking 
    if (event.target.value === 0) {
      //Returns 0 if a location is clicked
      inputValue = event.target.attributes[1]["nodeValue"];
      console.log(" event.target.value", event.target.value);
      console.log("(event.target.value === undefined", event.target.attributes[1]["nodeValue"]);
    } else {
      //Returns a typed value if something is typed
      inputValue = event.target.value;
      console.log(" event.target.value", event.target.value);
      console.log("(event.target.value === undefined", event.target.attributes[1]["nodeValue"]);
    } 
    console.log('searchbar', searchbar)
    event.persist();

    axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=${process.env.REACT_APP_GOOGLE_API_KEY}&sessiontoken=${sessionToken}`)
      .then(res => {
        let googleAutocomplete = res.data.predictions;
        this.setState({
          googleAutocomplete: googleAutocomplete,
          searchbar: inputValue
        });
        console.log("handleAutoComplete", googleAutocomplete);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  
  handleAutocompleteSeletion = (e)=>{
    // e.persist()
    let autoSeleection = e.target.attributes[1]["nodeValue"];
    this.setState({
      searchbar : autoSeleection
    })
    console.log(e.target.attributes[1]['nodeValue']);
  }

  handleChange = (event)=>{
    // const {searchbar} = this.state
    this.setState({ searchbar: event.target.attributes[1]["nodeValue"] });
  }
  
  clearInput = ()=>{
    this.setState({
      searchbar: ""
    })
  }

  render() {
    const {
      locationTitle,
      cloudCover,
      humidity,
      temperature,
      sunrise,
      sunset,
      weatherDescription,
      windSpeed,
      windDirection,
      airPressure,
      momentTimezoneCountry,
      googleAutocomplete,
      googleAutocompleteSelection,
      searchbar
    } = this.state;

    let sunsetMoment = moment.unix(sunset).format("h:mm:ss a");
    let sunriseMoment = moment.unix(sunrise).format("h:mm:ss a");
    let dewPoint = weatherFunctions.dewPointCalc(humidity, temperature);
    // searchbar = googleAutocompleteSelection
    dewPoint = Math.round(dewPoint);
    console.log('searchbar',searchbar)
    let tempInputHolder = searchbar
   
    return <div className="App">
        <title className="page-title">myWeather App</title>

        <div className="main-container ">
          <h2>{locationTitle}</h2>
          Time Stamp
          {new Date().toLocaleTimeString()}
          <p>Cloud Cover {cloudCover}%</p>
          <br />
          <p>Humidity {humidity}%</p>
          <br />
          <p>Temperature {temperature}°</p>
          <br />
          <p>Sunrise {sunriseMoment}</p>
          <br />
          <p>Sunset {sunsetMoment}</p>
          <br />
          <p>{weatherDescription}</p>
          <br />
          <p>
            Wind Speed {windSpeed} {"mph"}
          </p>
          <br />
          <p>
            Wind Direction{" "}
            {weatherFunctions.windDirectionFunc(windDirection)}
          </p>
          <br />
          <p>
            Air Pressure {airPressure} {"hPa"}
          </p>
          <br />
          <p>Dew Point {dewPoint}</p>
          <br />
          <div className="input-and-button">
            <input className="searchbar" onChange={this.handleAutoComplete} type="text" name="searchbar" value={this.state.searchbar} />
            <button className="get-weather" onClick={this.getWeather}>
              Get weather
            </button>
            <button className="get-weather" onClick={this.clearInput}>
              Clear
            </button>
            <br />

            <div>
              <ul>
                {googleAutocomplete.map((prediction, index, id) => (
                  <li
                    name="googleAutocompleteSelection"
                    key={prediction.id}
                    prediction={prediction.description}
                    value={prediction.description}
                    reference={prediction.reference}
                    onClick={this.handleAutoComplete}
                  >
                    {prediction.description}
                  </li>
                  // {/* {console.log(description.description)} */}
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default App;
