const mongoose = require('mongoose');

const Workout = new mongoose.Schema({
    day: { type: String, required: true, default: "Monday" },
    start_date: { type: Date, required: true, default: new Date() },
    end_date: { type: Date, required: true, default: new Date().setMonth(new Date().getMonth() + 1) },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'WorkoutCategory' },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', default: null },
});

module.exports = mongoose.model('Workout', Workout);