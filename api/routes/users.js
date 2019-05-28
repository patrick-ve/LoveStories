const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Retrieving a user'
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        biographyText: req.body.biographyText
    });
    user.save()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'User was created',
        createdUser: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted a user!',
        userId: req.params.userId
    });
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated a user!',
        userId: req.params.userId
    });
});

module.exports = router;