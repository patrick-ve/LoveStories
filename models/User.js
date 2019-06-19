const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Aanmaken van schema voor een story
const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	// Alhoewel dit een datum aangeeft, wordt een datum als string verkozen. Dit i.v.m. integratie met Moment.js
	dateJoined: {
		type: String
	}
});

mongoose.model('users', UserSchema);