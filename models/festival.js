const mongoose = require('mongoose');

// Aanmaken van Festival Schema + model
const festivalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    genre: String,
    date: Date,
    backgroundImage: String
});

module.exports =  mongoose.model('festival', festivalSchema);