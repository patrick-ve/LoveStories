const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', (req, res) => {
    let errors = [];

    // Validatie van gebruikersnaam
    function validateUserName(username) {
        let regEx = /^[a-zA-Z0-9]+$/;
        return regEx.test(username);
    }

    if (!validateUserName(req.body.username)) {
        errors.push({
            text: 'You can only use the following characters for your username: a-z, A-z and 0-9' 
        })
    }

    // Weergeven van flash messages bij fouten in registratie
    if(errors.length > 0) {
        res.render('users/login', {
            errors: errors
        });
        console.log('Checked');
    } else {
        res.send('passed');
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
        })
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
            name: req.body.name,
            email: req.body.name,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        res.send('passed');
    }
});

module.exports = router;