const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//set-up handlers and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//register partials
hbs.registerPartials(partialsPath);

//set-up static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kumar Saurabh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Kumar Saurabh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Kumar Saurabh',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ Error: 'Please provide the address' });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    weather(data.latitude, data.longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }

      console.log(data.location, weatherData);
      res.send([
        {
          forecast: weatherData,
          location: data.location,
          address: req.query.address,
        },
      ]);
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404 page not found',
    name: 'Kumar Saurabh',
    error: 'No help page found',
  });
});
app.get('*', (req, res) => {
  res.render('404page', {
    title: '404 page not found',
    name: 'Kumar Saurabh',
    error: 'page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up and running');
});
