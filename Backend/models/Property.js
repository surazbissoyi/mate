const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyId: { type: Number, required: true },
    name: String,
    occupancy: Number,
    rent: String,
    security_deposit: String,
    property_type: String,
    furnishing: String,
    about_room: String,
    about_mates: String,
    address: String,
    place: String,
    contact_no: String,
    email: String,
    instagram: String,
    linkedin: String,
    gender: String,
    preferred_gender: String,
    images: [String],
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
