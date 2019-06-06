const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Aanmaken van schema voor een story
const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    votes: {
        type: Number
    }
});

mongoose.model('stories', StorySchema);