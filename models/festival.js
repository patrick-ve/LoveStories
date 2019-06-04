const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const festivalSchema = new Schema({
    name: String,
    genre: String,
    date: String,
    location: String,
    backgroundImageUrl: String
});

module.exports = mongoose.model('festivals', festivalSchema);