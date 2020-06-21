const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=64ba36382bd6a49053845b61e16ebb0c&query=${latitude},${longitude}`;
    request({ url,json:true}, (error,{ body }) => {
        if(error){
            callback("Unable to connect to weather service!");
        } else if (body.error) {
            callback('Unable to find location!');
        } else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It's ${body.current.temperature}°C in ${body.location.name}, but it feels like ${body.current.feelslike}°C.And there is ${body.current.precip} chance of raining! The weather humidity is ${body.current.humidity}%. Wind speed is ${body.current.wind_speed}m/s`);        }
    });
}

module.exports = forecast;