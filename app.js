const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

// Load routes
const festivals = require('./routes/festivals');
const users = require('./routes/users');

// Passport Configuraties
require('./config/passport')(passport);

// Load view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');

// Define public resources
app.use(express.static(__dirname + '/public'));

// Setup bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Database setup
mongoose.connect('mongodb://localhost/festify', {
    useNewUrlParser: true
});
let db = mongoose.connection;

// Controleren van database errors
db.on('error', () => {
    console.log(err);
});

db.once('open', () => {
    console.log('Verbonden met MongoDB');
});



app.get('/', (req, res) => {
    res.render('landing')
});

app.get('/about', (req, res) => {
    res.render('about', {
        defaultLayout: 'landing'
    });
});


// Use festival routes
app.use('/festivals', festivals);
app.use('/users', users);




app.listen('8080', () => {
    console.log('Server is gestart op poort 8080');
});