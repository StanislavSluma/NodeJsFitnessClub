const mongoose = require('mongoose');

const ClubCardCategory = new mongoose.Schema({
    name: {  type: String, required: true, unique: true  },
    discount: { type: Number, required: true, default: 0.05 }
});

module.exports = mongoose.model('ClubCardCategory', ClubCardCategory);