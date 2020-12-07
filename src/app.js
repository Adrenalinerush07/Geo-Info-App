const path = require('path') // just a node module (no installation)
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// I just debugged the craziest path bug lol

// Current directory
// console.log(__dirname)

// setting up hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// providing path for public dir
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Geo-Info App',
        name : 'Kartik Jaiswal'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About this app',
        name : 'Kartik Jaiswal'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText: 'This is some helpfull text',
        title: 'Help',
        name : 'Kartik Jaiswal'
    })
})

app.get('/location', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude ,longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            latitude,
            longitude,
            location
        })
    })   
})


app.get('/forecast', (req, res) => {
    console.log('yahan mein')
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }
    forecast(req.query.address, (error, {temperature, condition, time, wind} ={}) => {
        if(error){
            return res.send({error})
        }
        res.send({
            temperature,
            condition,
            time,
            wind
        })
    })
})

// app.get('/products', (req,res) =>{
//     console.log(req.query)
//     if(!req.query.search){
//         res.send({
//             error: ' bhak'
//         })
//     }
//     res.send({
//         products :[]
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kartik Jaiswal',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up at port' + port + 'bruh ! ')
})