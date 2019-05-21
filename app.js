// var express = require('express');
// var path = require('path');
// var expbs = require('express-handlebars');

// var app = express();

// // Handlebars engine setup
// app.engine('handlebars', expbs({
//   defaultLayout: 'main',
//   layoutsDir: path.join(__dirname, 'views/layouts')
// }));
// app.set('view engine', 'handlebars');

// // app.use(express.static(__dirname + 'public'));
// app.set('views', path.join(__dirname, 'views'));

// // Routes voor website
// app.get('/', (req, res) => {
//   res.render('home');
// });

// app.get('/about', (req, res) => {
//   res.render('about');
// })

// // 404 handler (middleware)
// app.use((req, res, next) => {
//   res.status(404);
//   req.render('404');
// })

// // 500 error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500);
//   res.render('500');
// })

// // Definiëren van poort
// app.set('port', (process.env.PORT || 3000));

// app.listen(app.get('port'), () => {
//   console.log('Server is gestart op poort: ' + app.get('port'));
// });