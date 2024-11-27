const mongoose = require('mongoose');

const Client = new mongoose.Schema({
    name: { type: String, required: true, default: 'Client' },
    surname: { type: String, default: '' },
    patronymic: { type: String, default: '' },
    age: { type: Number, required: true, default: 18 },
    phone_number: { type: String },
    expenses: { type: Number, required: true, default: 0 },
    user_id: {type : mongoose.Schema.Types.ObjectId, required: true, ref : 'User'},
    card_id: {type : mongoose.Schema.Types.ObjectId, ref : 'ClubCard', default: null},
    coupon_id: {type : mongoose.Schema.Types.ObjectId, ref : 'Coupon', default: null},
});

module.exports = mongoose.model('Client', Client);