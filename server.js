const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const path = require('path');
const data = require('./models/data');
const gsap = require('gsap');

app.engine('handlebars', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/search', (req, res) => {
    res.render('search');
});


app.get('/api/data', (req, res) => {
    res.json(data);
  });


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