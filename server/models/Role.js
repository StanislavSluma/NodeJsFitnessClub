const mongoose = require('mongoose');

const Role = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Role', Role);