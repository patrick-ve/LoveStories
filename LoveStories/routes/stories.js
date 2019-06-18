const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Binnenhalen van models
require('../models/Story');
const Story = mongoose.model('stories');

// Afhandelen van toevoegen verhalen
router.get('/', (req, res) => {
    Story.find({})
        .sort({date: 'desc'})
        .then(stories => { // Promise waaruit een pagina render volgt
            res.render('stories/feed',{
                stories: stories
            });
        });
});

router.get('/add', (req, res) => {
    res.render('stories/add')
});

router.get('/edit/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        res.render('stories/edit', {
            story: story
        });
    });
    
});

router.post('/', (req, res) => {
        const newStory = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        }
        new Story(newStory)
            .save()
            // Promise waaruit een redirect volgt
            .then(story => { 
                req.flash('success_message', 'Your story has successfully been added!')
                res.redirect('/stories');
            });
    });

router.put('/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        // Veranderen van verhalen
        story.title = req.body.title,
        story.description = req.body.description,
        story.date = req.body.date
        story.save()
            .then(story => {
                req.flash('success_message', 'Your story has successfully been updated!')
                res.redirect('/stories')
            });
    });
});

router.delete('/:id', (req, res) => {
    Story.deleteOne({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_message', 'Your story has successfully been deleted!')
            res.redirect('/stories')
        });
});

module.exports = router;