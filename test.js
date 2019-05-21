const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// De server draait in productie meestal niet op 5000; dit is afhankelijk van de .env settings
const PORT = process.env.PORT || 5000;
app.set('port', process.env.PORT || 5000);

// Creëeren van static folder en views. __dirname verwijst naar de map waarin dit bestand (app.js) staat
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ 
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('routes', path.join(__dirname, 'routes'));
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname + '/contact.html'));
});

 // Page not found: 404 pagina
app.use((req, res) => { 
  res.type('text/plain');
  res.status(404);
  res.send('Foutmelding 404 - Pagina niet gevonden!');
});

// Server error: 500 pagina
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('Foutmelding 500 - Server Error!');
});

// Server luistert naar verkeer op poort 5000
app.listen(app.get(PORT), () => {
  console.log( 'Server is gestart op http://localhost:' +
  app.get('port') + '. Druk op Ctrl-C om af te sluiten.' );
});