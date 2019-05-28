// const express = require('express');
// const routes = require('./routes');
// const user = require('./routes/user');
// const http = require('http');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();

// // De server draait in productie meestal niet op 5000; dit is afhankelijk van de .env settings
// const PORT = process.env.PORT || 5000;
// app.set('port', process.env.PORT || 5000);

// // Creëeren van static folder en views. __dirname verwijst naar de map waarin dit bestand (app.js) staat
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ 
//   extended: true
// }));

// app.set('views', path.join(__dirname, 'views'));
// app.set('routes', path.join(__dirname, 'routes'));
// app.set('view engine', 'hbs');


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname + '/about.html'));
// });

// app.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname + '/contact.html'));
// });

//  // Page not found: 404 pagina
// app.use((req, res) => { 
//   res.type('text/plain');
//   res.status(404);
//   res.send('Foutmelding 404 - Pagina niet gevonden!');
// });

// // Server error: 500 pagina
// app.use((err, req, res, next) => { 
//   console.error(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('Foutmelding 500 - Server Error!');
// });

// // Server luistert naar verkeer op poort 5000
// app.listen(app.get(PORT), () => {
//   console.log( 'Server is gestart op http://localhost:' +
//   app.get('port') + '. Druk op Ctrl-C om af te sluiten.' );
// });

// // --------------------------------------------------------
// const express = require('express');
// const app = express();
// const exhbs = require('express-handlebars');
// const path = require('path');
// // const data = require('./models/festival');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// // Database verbinding
// // mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/festify', {
//     useNewUrlParser: true
// });


// app.engine('handlebars', exhbs({
//     defaultLayout: 'main',
//     layoutsDir: path.join(__dirname, 'views/layouts')
// }));
// app.set('view engine', 'handlebars');
// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
// // app.use(express.urlencoded());
// // app.use(bodyParser());

// // Middleware voor routes
// app.use('/api', require('./routes/api'));

// // Routes
// app.get('/', (req, res) => {
//     res.render('landing', {
//         layout: 'landing'
//     });
// });

// // app.get('/login', (req, res) => {
// //     res.render('login');
// // });

// // app.get('/about', (req, res) => {
// //     res.render('about');
// // });

// app.get('/search', (req, res) => {
//     res.render('search');
// });

// // app.get('/registered', (req, res) => {
// //     res.render('registered');
// // });

// // app.get('/api/data', (req, res) => {
// //     res.json(data);
// //   });

// // app.post('/submit-credentials', (req, res) => {
// //     console.log('Form (from querystring): ' + req.query.form);
// //     console.log('CSRF token (from hidden form field): ' + req.body._csrf);
// //     console.log('Username (from visible form field): ' + req.body.username);
// //     console.log('password (from visible form field): ' + req.body.password);
// //     // const username = req.body.username;
// //     // const password = req.body.password;
// //     res.redirect(303, '/registered');
// //     res.end();
// // })

// // 404
// app.use((req, res, next) => {
//     res.status(404);
//     res.render('404');
// });

// // 500
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500);
//     res.render('500');
// });

// app.listen(process.env.port || 8080, () => {
//     console.log('Server is gestart op poort ', 8080);
// });