const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getGeoData = require('./getGeoData');
const getWeather = require('./getWeather');
const weatherDisplay = require('./weatherDisplay');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'Use this site to get your weather!',
        copyright: 'Julian Domke',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        description: "I'm pretty cool.",
        copyright: 'Julian Domke',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'You need help?',
        description: "You're at the right place.",
        copyright: 'Julian Domke',
    });
});

app.get('/weather', (req, res) => {
    if (Boolean(req.query.address) === false) {
        return res.send({ error: 'You need to provide an address.' });
    }

    getGeoData(req.query.address, function (err, geoData) {
        if (err) return res.send({ err });
        else
            getWeather(geoData, function (err, response) {
                const { location, forecast } = weatherDisplay(err, response);
                return res.send({
                    address: req.query.address,
                    location,
                    forecast,
                });
            });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Helpful article not found.',
        description: 'Maybe you can find other helpful ones?',
        copyright: 'Julian Domke',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found.',
        description: "Maybe we'll make one for you in the future.",
        copyright: 'Julian Domke',
    });
});

app.listen(3000, () => {
    console.log('App running on Port 3000.');
});
