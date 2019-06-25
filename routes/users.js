/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const passport = require('passport');

// Binnenhalen van story model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
	res.render('users/login');
});


router.post('/login', (req, res, next) => {
	let errors = [];

	// Validatie van gebruikersnaam
	function validateUserName(username) {
		let regEx = /^[a-zA-Z0-9]+$/;
		return regEx.test(username);
	}

	if (!validateUserName(req.body.username)) {
		errors.push({
			text: 'You can only use the following characters for your username: a-z, A-z and 0-9'
		});
	}

	// Weergeven van flash messages bij fouten in registratie
	if(errors.length > 0) {
		res.render('users/login', {
			errors: errors
		});
	} else {
		passport.authenticate('local', {
			successRedirect: '/stories',
			failureRedirect: '/users/login',
			failureFlash: true
		})(req, res, next);
	}
});

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', (req, res) => {
	let errors = [];

	// Validatie van wachtwoord bij registratie
	if(req.body.password != req.body.password2) {
		errors.push({
			text: 'Your passwords do not match!'
		});
	}

	// Validatie van emailadres bij registratie
	// Bron: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	function validateEmail(email) {
		let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regEx.test(email);
	}

	if (!validateEmail(req.body.email)){
		errors.push({
			text: 'You have provided an invalid email address!'
		});
	}

	// Validatie van gebruikersnaam bij registratie (gebruikersnaam mag geen speciale karakters bevatten)
	function validateUserName(username) {
		let regEx = /^[a-zA-Z0-9]+$/;
		return regEx.test(username);
	}

	if (!validateUserName(req.body.username)) {
		errors.push({
			text: 'You can only use the following characters for your username: a-z, A-z and 0-9'
		});
	}

	// Validatie van lengte wachtwoord bij registratie
	if (req.body.password.length < 5) {
		errors.push({
			text: 'The minimum length of your password must be at least 5 characters!'
		});
	}

	// Weergeven van flash messages bij fouten in registratie
	if(errors.length > 0) {
		res.render('users/register', {
			errors: errors,
			name: req.body.username,
			email: req.body.email,
			password: req.body.password,
			password2: req.body.password2
		});

		// Bij geen validatiefouten -> controleren of gebruikersnaam al bestaat
	} else {
		User.findOne({username: req.body.username})
			.then(user => {
				if(user) {
					req.flash('error_message', 'Username is already in use!');
					res.redirect('/users/register');
				} else {
					// Als gebruiker nog niet bestaat -> gebruikersnaam mag aangemaakt worden
					let date = new Date;
					const newUser = new User({
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
						dateJoined: moment(date).format('DD-MM-YYYY')
					});

					// Gebruiken van bcrypt om wachtwoord te hashen
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash (newUser.password, salt, (err, hash) => {
							if (err) throw(err);
							newUser.password = hash;
							newUser.save()
								.then(user => {
									// Redirect met succesmelding
									req.flash('success_message', 'You have successfully registered and you can now log in!');
									res.redirect('/users/login');
								})
								.catch(err => {
									console.log(err);
									return;
								});
						});
					});
				}
			});
	}
});

// Uitloggen van gebruiker
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_message', 'You have successfully logged out!');
	res.redirect('/users/login');
});

module.exports = router;