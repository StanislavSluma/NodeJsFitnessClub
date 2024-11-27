const mongoose = require('mongoose');

const Instructor = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String },
    patronymic: { type: String },
    age: { type: Number, required: true },
    phone_number: { type: String, required: true },
    about: { type: String, default: "Этот инструктор ничего не оставил о себе ..." },
    url_photo: { type: String, default: null },
    user_id: {type : mongoose.Schema.Types.ObjectId, required: true, ref : 'User'},
});

module.exports = mongoose.model('Instructor', Instructor);