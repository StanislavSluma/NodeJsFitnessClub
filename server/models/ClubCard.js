const mongoose = require('mongoose');

const ClubCard = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ClubCardCategory' },
    end_date: { type: Date, required: true, default: new Date().setMonth(new Date().getMonth() + 1) },
});

module.exports = mongoose.model('ClubCard', ClubCard);