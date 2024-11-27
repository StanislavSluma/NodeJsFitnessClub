const mongoose = require('mongoose');

const WorkoutCategory = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    about: { type: String, default: "Данный вид занятий просто замечателен!" },
});

module.exports = mongoose.model('WorkoutCategory', WorkoutCategory);