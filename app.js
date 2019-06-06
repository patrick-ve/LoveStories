// Binnenhalen van node modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initiëren van applicatie
const app = express();

const PORT = 8080;

// Database setup -----------------------------------------
mongoose.connect('mongodb://localhost:27017/lovestories', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database has started');
});

// Binnenhalen van models
require('./models/Story');
const Story = mongoose.model('stories');

// Middleware setup ---------------------------------------
// Handlebars templating engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Definiëren van public resources
app.use(express.static(__dirname + '/public'));


// Routes op server ---------------------------------------
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Afhandelen van toevoegen verhalen
app.get('/stories', (req, res) => {
    Story.find({})
        .sort({date: 'desc'})
        .then(stories => { // Promise waaruit een pagina render volgt
            res.render('stories/feed',{
                stories: stories
            });
        });
});

app.get('/stories/add', (req, res) => {
    res.render('stories/add')
});

app.post('/stories', (req, res) => {
        const newStory = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        }
        new Story(newStory)
            .save()
            .then(story => { // Promise waaruit een redirect volgt
                res.redirect('/stories');
            });
    });

app.listen(PORT, () => {
    console.log(`Server has started at localhost:${PORT}`);
});
