const mongoose = require('mongoose');

// Aanmaken van User Schema + model
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    biographyText: String
});

module.exports = mongoose.model('User', userSchema);