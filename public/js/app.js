

console.log('js file ka console,log hun mein lol')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
const message3 = document.querySelector('#msg-3')
const message4 = document.querySelector('#msg-4')

const message5 = document.querySelector('#msg-5')
const message6 = document.querySelector('#msg-6')
const message7 = document.querySelector('#msg-7')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Fetching data from API, please wait a sec....'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    message5.textContent = ''
    message6.textContent = ''
    message7.textContent = ''

    
    fetch('http://localhost:3000/forecast?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log('Please provide a valid location ')
                message1.textContent = data.error
            }
            else{
                message1.textContent = 'Temperature: ' + data.temperature + ' °C'
                message2.textContent = 'Wind Speed: ' + data.wind + ' Mph'
                message3.textContent = 'Fetching time: ' + data.time
                message4.textContent = 'Weather condition: ' + data.condition

                // console.log(data.temperature);
                // console.log(data.wind)
                // console.log(data.time)
                // console.log(data.condition)

                fetch('http://localhost:3000/location?address=' + location).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log('Please provide a valid location ')
                            message5.textContent = data.error
                        }
                        else{
                            message5.textContent = 'Latitude: ' + data.latitude
                            message6.textContent = 'Longitude: ' + data.longitude
                            message7.textContent = 'Precise location: ' + data.location
                            // console.log(data.temperature);
                            // console.log(data.wind)
                            // console.log(data.time)
                            // console.log(data.condition)
                        }
                    })
                })
            }
        })
    })

    // fetch('http://localhost:3000/location?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         if(data.error){
    //             console.log('Please provide a valid location ')
    //             message5.textContent = data.error
    //         }
    //         else{
    //             message5.textContent = 'Latitude: ' + data.latitude
    //             message6.textContent = 'Longitude: ' + data.longitude
    //             message7.textContent = 'Precise location: ' + data.location
    //             // console.log(data.temperature);
    //             // console.log(data.wind)
    //             // console.log(data.time)
    //             // console.log(data.condition)
    //         }
    //     })
    // })

})