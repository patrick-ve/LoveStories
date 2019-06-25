/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const moment = require('moment');
const { ensureAuthenticated } = require('../utils/auth');
const { postPhoto } = require('../utils/image');

// Binnenhalen van story model
require('../models/Story');
const Story = mongoose.model('stories');

// Multer setup
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './static/upload');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, userId + '.jpg');
// 	}
// });

// const upload = multer({
// 	storage: storage
// });


// Afhandelen van verhalen
router.get('/',  ensureAuthenticated, (req, res) => {
	Story.find({})
		.sort({dateAdded: 'desc'})

	// Promise waaruit een pagina render volgt
		.then(stories => {
			res.render('stories/feed',{
				stories: stories
			});
		});
});

// Afhandelen van toevoegen van verhalen
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('stories/add');
});

// Afhandelen van bewerken van verhalen
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	Story.findOne({
		_id: req.params.id
	})
		.then(story => {
			if(story.user != req.user.id) {
				req.flash('error_message', 'You are not allowed to edit this story!');
				res.redirect('/stories');
			} else {
				res.render('stories/edit', {
					story: story
				});
			}
		});
});

router.post('/', ensureAuthenticated, (req, res) => {
	let date = req.body.date;
	const newStory = new Story({
		title: req.body.title,
		description: req.body.description,
		dateAdded: moment(date).format('DD-MM-YYYY'),
		user: req.user.id,
		// photo: {
		// 	data: fs.readFileSync(req.files.photo.path),
		// 	contentType: 'image/jpg'
		// }
	});
	newStory.save()
		// Promise waaruit een redirect volgt
		.then(story => {
			req.flash('success_message', 'Your story has successfully been added!');
			res.redirect('/stories');
		});
});

router.put('/:id', ensureAuthenticated, (req, res) => {
	Story.findOne({
		_id: req.params.id
	})
		.then(story => {
			// Veranderen van verhalen
			story.title = req.body.title,
			story.description = req.body.description,
			story.date = req.body.date;
			story.photo.data = fs.readFileSync(req.files.userPhoto.path);
			story.photo.contentType = 'image/jpg';
			story.save()
				.then(story => {
					req.flash('success_message', 'Your story has successfully been updated!');
					res.redirect('/stories');
				});
		});
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
	Story.findOne({
		_id: req.params.id
	})
		.then(story => {
			if(story.user != req.user.id) {
				req.flash('error_message', 'You are not allowed to delete this story!');
				res.redirect('/stories');
			} else {
				story.deleteOne()
					.then(story => {
						req.flash('success_message', 'Your story has successfully been deleted!');
						res.redirect('/stories');
					});
			}
		});
});

module.exports = router;