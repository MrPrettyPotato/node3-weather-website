const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const data = (title,name,info)=>{
    const data = {
        title,
        name,
        info
    }
    return data
}

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', data('Home page', 'Kristof Volkaerts'))
})
app.get('/about', (req, res) => {
    res.render('about', data('About Me', 'Kristof Volkaerts'))
})
app.get('/help', (req, res) => {
    res.render('help', data('Help page', 'Kristof Volkaerts'))
})




app.get('/weather', (req, res) => {
    
    if(!req.query.adress) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.adress, (error, {latitude,longtitude,location} = {})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            return res.send(forecastData)
        })
    })
    
})


app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404', data('404 page', 'Kristof Volkaerts','Help page not found!'))
})
app.get('/about/*',(req,res)=>{
    res.render('404', data('404 page', 'Kristof Volkaerts','About page not found!'))
})
app.get('*', (req,res) =>{
    res.render('404', data('404 page', 'Kristof Volkaerts'))
    })
//app.com
//app.com/help
//app.com/about

//Start the app
app.listen(port, () => {
    console.log('Server started! on port: ' + port)
})