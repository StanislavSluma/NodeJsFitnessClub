const mongoose = require('mongoose');

const ClientGroup = new mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

module.exports = mongoose.model('ClientGroup', ClientGroup);