// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  authId: String,
  name: String,
  role: String,
  email: String,
  username: String,
  created: Date,
});

var user = mongoose.model('User', userSchema);

module.exports = user;