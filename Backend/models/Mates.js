const mongoose = require('mongoose');

const mateSchema = new mongoose.Schema({
    userId: { type: Number, required: true },  // Auto-increment user ID
    name: String,
    age: Number,
    place: String,
    budget: String,
    habits: [String],
    occupation: String,
    about: String,
    contact_no: String,
    email: String,
    instagram: String,
    linkedin: String,
    gender: String,
    preferred_gender: String,
    image: {type: String, required: true}
});

const Mate = mongoose.model('Mate', mateSchema);

module.exports = Mate;
