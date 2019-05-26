const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const path = require('path');
const data = require('./models/user');
const gsap = require('gsap');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/festify', {
    useMongoClient: true,
    useNewUrlParser: true
});
let db = mongoose.Connection;

app.engine('handlebars', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(bodyParser());

// Routes
app.get('/', (req, res) => {
    res.render('landing', {
        layout: 'landing'
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/registered', (req, res) => {
    res.render('registered');
});

app.get('/api/data', (req, res) => {
    res.json(data);
  });

app.post('/submit-credentials', (req, res) => {
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Username (from visible form field): ' + req.body.username);
    console.log('password (from visible form field): ' + req.body.password);
    // const username = req.body.username;
    // const password = req.body.password;
    res.redirect(303, '/registered');
    res.end();
})

// 404
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



app.listen(8080, () => {
    console.log('Server is gestart op poort ', 8080);
});