const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Binnenhalen models
require('../models/festival');
const Festival = mongoose.model('festivals');


router.get('/', (req, res) => {
    Festival.find({})
    .then(festivals => {
        res.render('festivals/index', {
            festivals: festivals
        });
    });
});


router.delete('/:id', (req, res) => {
    Festival.remove({_id: req.params.id})
      .then(() => {
        res.redirect('/');
      });
  });

router.get('/add', (req, res) => {
    res.render('festivals/add');
});


router.post('/', (req, res) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({
            message: 'Please add a name'
        })
    };

    if (!req.body.genre) {
        errors.push({
            message: 'Please add a genre'
        })
    };

    if (errors.length > 0) {
        res.render('festivals/add');
    } else {
        const newFestival = {
            name: req.body.name,
            genre: req.body.genre,
            date: req.body.date,
            location: req.body.location,
            backgroundImageUrl: req.body.backgroundImageUrl
        }
        new Festival(newFestival)
        .save()
        .then(festival => {
            res.redirect('/festivals');
        });
    }
});

module.exports = router;