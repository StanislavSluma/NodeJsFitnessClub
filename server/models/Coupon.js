const mongoose = require('mongoose');

const Coupon = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "Отличный купон!" },
    code: { type: Number, required: true, unique: true },
    discount: { type: Number, required: true, default: 0.05 },
    end_date: { type: Date, required: true, default: new Date().setMonth(new Date().getMonth() + 1) },
});

module.exports = mongoose.model('Coupon', Coupon);