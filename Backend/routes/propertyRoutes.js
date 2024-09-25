// Import necessary modules
const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// Existing POST route to add a property
router.post('/add', async (req, res) => {
    const propertyData = req.body;

    try {
        const existingProperty = await Property.findOne({ email: propertyData.email }).exec();
        if (existingProperty) {
            return res.status(400).json({ message: 'Property already present with this email ID.' });
        }

        const lastProperty = await Property.findOne().sort({ propertyId: -1 }).exec();
        const propertyId = lastProperty ? lastProperty.propertyId + 1 : 1;

        const newProperty = new Property({ ...propertyData, propertyId });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving property' });
    }
});

// GET method to fetch all properties with optional filtering by place
router.get('/allproperties', async (req, res) => {
    const { place } = req.query;

    try {
        const properties = await Property.find(place ? { place: { $regex: place, $options: 'i' } } : {}).exec();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
});

// New GET method to fetch a property by ID
router.get('/property/:id', async (req, res) => {
    const { id } = req.params; // Get the property ID from the route parameters

    try {
        const property = await Property.findOne({ propertyId: id }).exec(); // Fetch property by ID
        if (!property) {
            return res.status(404).json({ message: 'Property not found' }); // Handle not found case
        }
        res.status(200).json(property); // Return the found property
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching property' }); // Handle errors
    }
});

module.exports = router;
