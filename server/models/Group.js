const mongoose = require('mongoose');

const Group = new mongoose.Schema({
    name: { type: String, required: true },
    max_workouts: { type: Number, required: true },
    max_clients: { type: Number, required: true },
    price: { type: Number, required: true },
    current_clients: { type: Number, default: 0 },
});

module.exports = mongoose.model('Group', Group);