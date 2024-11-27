const mongoose = require('mongoose');

const InstructorWorkout = new mongoose.Schema({
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    workout_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
});

module.exports = mongoose.model('InstructorWorkout', InstructorWorkout);