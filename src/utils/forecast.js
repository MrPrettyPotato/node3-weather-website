const request = require('request')

const forecast = (long,lat,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7ccddbf609f18952dde89b5f8d44564f&query='+lat+','+long

    request({url,json:true},(error,{body}) =>{
        if(error) {
            callback('Canot connect to the location service! '+ error,undefined)
        } else if(body.error) {
            callback('Unable to use these coords!' + response.body,undefined)
        } else {
            
            const {name,country,region,lat,lon} = body.location
            const {temperature,wind_speed:windSpeed,feelslike} = body.current
             callback(undefined,{
                 info1: 'The temperature is :' + temperature + '° and it feels like '+ feelslike ,
                 info2:' The windspeed is ' + windSpeed + ' and  goes to ' + body.current.wind_dir,
                 weatherDiscription:body.current.weather_descriptions[0],
                 humindity:body.current.humindity,
                 location: name,
                 country,
                 temperature,
                 windSpeed
             })
        }
    })
}
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

module.exports = forecast