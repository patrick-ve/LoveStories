// Binnenhalen van node modules
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');

// Initiëren van applicatie
const app = express();

const PORT = 8080;

// require('dotenv').config();
// const mongooseURL = process.env.MONGO_DB_URL;

// Database setup -----------------------------------------
mongoose.connect('mongodb://localhost:27017/lovestories', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database has started.');
});
db.on('reconnected', () => {
    console.log('Database has reconnected.')
});
db.on('disconnected', () => {
    console.log('Database has disconnected.')
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

// Method override middleware voor PUT requests in <form>
app.use(methodOverride('_method'));

// Sessions voor applicatie initialiseren
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Globale variablen voor flash messages
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

// Definiëren van public resources
app.use(express.static(__dirname + '/public'));

// Definiëren van locatie voor opgeslagen afbeeldingen
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
    });
var upload = multer({ 
    storage: storage
});


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

app.get('/stories/edit/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        res.render('stories/edit', {
            story: story
        });
    });
    
});

app.post('/stories', (req, res) => {
        const newStory = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        }
        new Story(newStory)
            .save()
            // Promise waaruit een redirect volgt
            .then(story => { 
                req.flash('success_message', 'Your story has successfully been added!')
                res.redirect('/stories');
            });
    });

app.put('/stories/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        // Veranderen van verhalen
        story.title = req.body.title,
        story.description = req.body.description,
        story.date = req.body.date
        story.save()
            .then(story => {
                req.flash('success_message', 'Your story has successfully been updated!')
                res.redirect('/stories')
            });
    });
});

app.delete('/stories/:id', (req, res) => {
    Story.deleteOne({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_message', 'Your story has successfully been deleted!')
            res.redirect('/stories')
        });
});

app.listen(PORT, () => {
    console.log(`Server has started at localhost:${PORT}`);
});
