const mongoose = require('mongoose');

const paidUserSchema = mongoose.Schema({
    email: {type: String, required: true}
});

const paidUser = mongoose.Schema('paidUser', paidUserSchema);

module.exports = paidUser;