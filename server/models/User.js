const mongoose = require('mongoose');

const User = new mongoose.Schema({
   google_id: {type : String},
   username: {type: String, required: true, unique : true},
   password: {type: String},
   email: {type: String},
   role_id: {type : mongoose.Schema.Types.ObjectId, require: true, ref : 'Role'},
});

module.exports = mongoose.model('User', User);