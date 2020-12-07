const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=a8f1733bae5f4b02895195606200212&q=' + address

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service !', undefined)
        }
        else if(body.error){
            callback(body.error.message, undefined)
        }
        else{
            // callback(undefined,response.body.current.temp_c)
            callback(undefined, {
                temperature: body.current.temp_c,
                condition: body.current.condition.text,
                time: body.location.localtime,
                wind: body.current.wind_mph
            })
        }
    })
}

// request({url: url, json: true}, (error,response) =>{
//     if(error){
//         console.log('Unable to connect to weather service !')
//     }
//     else if(response.body.error){
//         console.log(response.body.error.message)
//     }
//     else{
//         console.log('Current temp is ' + response.body.current.temp_c + ' degree Celcius in Vadodara')
//     }
// })

module.exports = forecast