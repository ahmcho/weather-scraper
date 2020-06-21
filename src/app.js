const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahm Cho'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ahm Cho',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ahm Cho',
        message: 'Here you can get help.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address/location to search'
        })
    }
    geocode(req.query.address, (error, { latitude,longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error',
        message: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})