import React from "react"


const LeftPanel = ({
        activeSearch,
        cloudCover,
        humidity,
        temperature,
        sunriseMoment,
        sunsetMoment
    }) => {
    return <div className={`main-info-left-${activeSearch}`}>
            <p>Cloud Cover {cloudCover}%</p>
            <p>Humidity {humidity}%</p>
            <p>Temperature {temperature}°</p>
            <p>Sunrise {sunriseMoment}</p>
            <p>Sunset {sunsetMoment}</p>
          </div>
}

export default LeftPanel