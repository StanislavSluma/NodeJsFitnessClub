const mongoose = require('mongoose');

const Hall = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house_number: { type: String, required: true },
});

module.exports = mongoose.model('Hall', Hall);