const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /festivals'
    });
});

router.post('/', (req, res, next) => {
    const festival = {
        festivalName: req.body.festivalName,
        festivalGenre: req.body.festivalGenre
    }
    res.status(201).json({
        message: 'Added a festival',
        createdFestival: festival
    });
});

router.get('/:festivalId', (req, res, next) => {
    const id = req.params.festivalId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.delete('/:festivalId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted a festival!'
    });
});

module.exports = router;