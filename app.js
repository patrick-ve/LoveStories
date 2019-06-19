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
const passport = require('passport');

// Initiëren van applicatie
const app = express();
const port = process.env.PORT || 5000;

// Binnenhalen van routes
const stories = require('./routes/stories');
const users = require('./routes/users');

// Binnenhalen van passport config
require('./config/passport')(passport);
require('dotenv').config();

// require('dotenv').config();
// const mongooseURL = process.env.MONGO_DB_URL;

// Database setup -----------------------------------------
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.mongoURI, {
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

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash message middleware
app.use(flash());

// Globale variablen voor applicatie
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
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

app.use('/stories', stories);
app.use('/users', users)

app.listen(port, () => {
    console.log(`Server has started at localhost:${port}`);
});
