const router = require('express').Router();
const Workout = require('../models/workout.js');

router.get('/api/workout', (req, res) => {
    Workout.find({})
        .sort({ name: -1 })
        .then(workout => {
            res.json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.post('/api/workouts', async (req, res) => {
    Workout.create({})
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true }).then((workout) => {
        res.json(workout);
    });
});

router.get('/api/workouts/', (req, res) => {
    Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }])
        .sort({ name: -1 })
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }])
        .limit(7)
        .sort({ name: -1 })
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/api/stats', (req, res) => { });

module.exports = router;