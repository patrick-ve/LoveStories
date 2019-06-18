const express = require('express');
const router = express.Router();
const Festival = require('../models/festival');
const mongoose = require('mongoose');

router.get('/festivals', (req, res) => {
    res.send({
        type: 'GET'
    })
});

router.post('/festivals', (req, res) => {
    const festival = new Festival({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        genre: req.body.genre,
        date: req.body.date,
        backgroundImage: req.body.backgroundImage
        });
    festival.save();
    console.log(festival);
});

router.get('/festivals/:id', (req, res) => {
    res.send({
        type: 'GET'
    })
});

module.exports = router;