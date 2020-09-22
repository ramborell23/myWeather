import React from "react"
import weatherFunctions from "./WeatherFunctions/functions.js";


const RightPanel = ({
        activeSearch,
        weatherDescription,
        windSpeed,
        windDirection,
        airPressure,
        dewPoint
    }) => {
    return  <div className={`main-info-right-${activeSearch}`}>
            <p>{weatherFunctions.capFirstletter(weatherDescription)}</p>
            <p>Wind Speed {windSpeed} {"mph"}</p>
            <p>Wind Direction{" "}{weatherFunctions.windDirectionFunc(windDirection)}</p>
            <p> Air Pressure {airPressure} {"hPa"}</p>
            <p>Dew Point {dewPoint}</p>
          </div>
}


export default RightPanel