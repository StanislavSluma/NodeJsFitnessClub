const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    grade: { type: Number, required: true, default: 5 },
    text: { type: String, required: true },
    date_time: { type: Date, required: true, default: new Date() },
    client_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Client" },
});

module.exports = mongoose.model('Review', Review);