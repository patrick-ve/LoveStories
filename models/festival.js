const mongoose = require('mongoose');

// Aanmaken van User Schema + model
let festivalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: String,
    genre: String,
    location: String
});

let Festival = module.exports = mongoose.model('Festival', festivalSchema);