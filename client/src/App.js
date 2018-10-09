import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "./Stylesheets/main.css";
import axios from 'axios'
import weatherFunctions from "./WeatherFunctions/functions.js";
var moment = require("moment");
const dotenv = require("dotenv");
dotenv.config();

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      searchbar: '',
      locationTitle: '',
      // locationLongtitude: '',
      // locationLattitude: '',
      cloudCover: '',
      humidity: '',
      temperature: '',
      sunrise: '',
      sunset: '',
      weatherDescription: '',
      windSpeed: '',
      windDirection: '',
      airPressure: ''
    };
  }


  getWeather = () => {
    // const { searchTerm } = this.state
    // http://localhost:3100/teams/salary/${teamArraySelect}
    const { searchbar } = this.state;
    let locationLattitude =''
    let locationLongtitude = ''
    let fiveDayHashTable = {}
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchbar}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        let googleGeo = res.data.results[0];
        console.log(googleGeo);
        this.setState({ locationTitle: googleGeo.formatted_address });

        locationLattitude = googleGeo.geometry.location.lat;
        locationLongtitude = googleGeo.geometry.location.lng;
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?lat=${locationLattitude}&lon=${locationLongtitude}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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
              // .get(`http://api.openweathermap.org/data/2.5/weather?lat=${locationLattitude}&lon=${locationLongtitude}&units=imperial&appid=${weatherApiKey}`)
              .get(`http://api.openweathermap.org/data/2.5/forecast?lat=${locationLattitude}&lon=${locationLongtitude}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
              .then(res => {
                let fiveDayForecast = res.data.list;
                let tempArr = [];
                for (let i = 0; i < fiveDayForecast.length; i++) {
                  tempArr = [...tempArr, fiveDayForecast[i]];
                  console.log(fiveDayForecast[i]["dt_txt"].slice(0, 10));
                  let forecastIndexValue = fiveDayForecast[i]["dt_txt"].slice(0, 10);
                  if (fiveDayHashTable.hasOwnProperty(fiveDayForecast[i]["dt_txt"].slice(0, 10))) {
                    console.log("Already has this property");
                    fiveDayHashTable[fiveDayForecast[i]["dt_txt"].slice(0, 10)] = [...fiveDayHashTable[forecastIndexValue], fiveDayForecast[i]];
                    console.log("OUR CHECK>>>>><>>>", fiveDayHashTable[fiveDayForecast[i]["dt_txt"].slice(0, 10)]);
                  } else {
                    console.log("Creating this property");
                    fiveDayHashTable[fiveDayForecast[i]["dt_txt"].slice(0, 10)] = [fiveDayForecast[i]];
                    console.log("OUR CHECK23>>>>><>>>", fiveDayHashTable[fiveDayForecast[i]["dt_txt"].slice(0, 10)]);
                  }
                }
                // console.log('TEMP ARR+++>',tempArr);
                console.log("fiveDayHashTable====>", fiveDayHashTable);
                this.setState({});
                console.log(fiveDayForecast);
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
  }

  handleAutoComplete = (searchLocation) => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&strictbounds&key=${process.env.REACT_APP_GOOGLE_API_KEY}&sessiontoken=1234567890`)
      .then(res => {
        let data = res.data;
        // this.setState({ arrOfNBATeams: ["", ...data] });
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleInputText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
             const { locationTitle, cloudCover, humidity, temperature, sunrise, sunset, weatherDescription, windSpeed, windDirection, airPressure } = this.state;
             // console.log(searchbar)
             // console.log(locationLongtitude);
             // console.log(locationLattitude);
             let sunriseMoment = moment.unix(sunrise).utc();;
             let sunsetMoment = moment.unix(sunset).utc();;
            //  var day1 = moment.unix(1318781876).utc();

             // console.log('day1>>>>>>',day1);
            //  console.log( sunsetMoment);
             sunriseMoment = sunriseMoment._d;
             sunsetMoment = sunsetMoment._d;

            //  console.log( sunsetMoment);
            //  console.log(typeof sunsetMoment);
             // console.log(locationTitle);
             // console.log(this.state);
             // console.log('day   ', day._d);
             // for(let property in  day ){
             //   console.log(property)
             // }
            console.log(weatherFunctions.windDirectionFunc(windDirection))
             return <div className="App">
                 <title className="page-title">
                   myWeather App
                 </title>

                 <div className="main-container ">
                   <h2>{locationTitle}</h2>
                   <p>Cloud Cover{' '}{cloudCover}%</p>
                   <br />
                   <p>Humidity{' '}{humidity}%</p>
                   <br />
                   <p>Temperature{' '}{temperature}°</p>
                   <br />
                   <p>Sunrise{' '}{JSON.stringify(sunriseMoment)}</p>
                   <br />
                   <p>Sunset{' '}{JSON.stringify(sunsetMoment)}</p>
                   <br />
                   <p>{weatherDescription}</p>
                   <br />
                   <p>Wind Speed{' '}{windSpeed}</p>
                   <br />
                   <p>Wind Direction{' '}{weatherFunctions.windDirectionFunc(windDirection)}</p>
                   <br />
                   <p>Air Pressure{' '}{airPressure}</p>
                   <br />
                   <p>Dew Point{' '}{weatherFunctions.dewPointCalc(humidity, temperature)}</p>
                   <br />
                   <div className="input-and-button">
                     <input className="searchbar" onChange={this.handleInputText} type="text" name="searchbar" />
                     <button className="get-weather" onClick={this.getWeather}>
                       Get weather
                     </button>
                   </div>
                 </div>
               </div>;
           }
}

export default App;
