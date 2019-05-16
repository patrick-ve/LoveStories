const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');

const app = express();

// De server draait in productie meestal niet op 5000; dit is afhankelijk van de .env settings
const PORT = process.env.PORT || 5000;

// Creëeren van static folder en views
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Server luistert naar verkeer op poort 5000
app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});