

const celsiusToF = celsiusValue => {
    let fahrenheitValue = celsiusValue * (9 / 5) + 32
    return fahrenheitValue
}

const fahrenheitToC = fahrenheitValue => {
    let celsiusValue = (fahrenheitValue - 32) * (5 / 9)
    return celsiusValue;
};


const windDirectionFunc = (numValue) => {
    console.log(numValue)
    let directionReturned = ''

    if (numValue > 348.75 || numValue < 11.25) {
        directionReturned = "N";
    } else if (11.25 < numValue && numValue  < 33.75) {
        directionReturned = "NNE";
    } else if (33.75 < numValue && numValue < 56.25) {
        directionReturned = "NE";
    } else if (56.25 < numValue && numValue < 78.75) {
        directionReturned = "ENE";
    } else if (78.75 < numValue && numValue < 101.25) {
        directionReturned = "E";
    } else if (101.25 < numValue && numValue < 123.75) {
        directionReturned = "ESE";
    } else if (123.75 < numValue && numValue < 146.25) {
        directionReturned = "SE";
    } else if (146.25 < numValue && numValue < 168.75) {
        directionReturned = "SSE";
    } else if (168.75 < numValue && numValue < 191.25) {
        directionReturned = "S";
    } else if (191.25 < numValue && numValue < 213.75) {
        directionReturned = "SSW";
    } else if (213.75 < numValue && numValue < 236.25) {
        directionReturned = "SW";
    } else if (236.25 < numValue && numValue < 258.75) {
        directionReturned = "WSW";
    } else if (258.75 < numValue && numValue < 281.25) {
        directionReturned = "W";
    } else if (281.25 < numValue && numValue < 303.75) {
        directionReturned = "WNW";
    } else if (303.75 < numValue && numValue < 326.25) {
        directionReturned = "NW";
    } else if (326.25 < numValue && numValue < 348.75) {
        directionReturned = "NNW";
    }else {
        directionReturned = `lol`;
    }
    return directionReturned
}

const dewPointCalc = (humidity, temperature) => {
    let celsiusValue = fahrenheitToC(temperature)
    console.log(celsiusValue)
    // Ts = (b * α(T, RH)) / (a - α(T, RH))
    // T = Temperature
    // RH = Relative Humidity
    // a and b are coefficients.
    // For Sonntag90 constant set, a = 17.62 and b = 243.12°C;
    let a = 17.62;
    let b = 243.12;
    let RH = humidity;
    let T = fahrenheitToC(temperature);

    let alpha = Math.log(RH / 100) + a * T / (b + T)
    let dewPoint = celsiusToF((b * alpha) / (a - alpha))
    console.log(dewPoint)

    return dewPoint
}

export default {
    celsiusToF,
    dewPointCalc,
    fahrenheitToC,
    windDirectionFunc,
};