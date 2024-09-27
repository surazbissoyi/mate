const mongoose = require('mongoose');

const paidUserSchema = mongoose.Schema({
    email: {type: String, required: true}
});

const paidUser = mongoose.model('paidUser', paidUserSchema);

module.exports = paidUser;