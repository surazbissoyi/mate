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

router.post('/bulk-add', async (req, res) => {
    const propertiesData = req.body;

    try {
        // Check for existing properties with the same email
        const existingProperties = await Property.find({
            email: { $in: propertiesData.map(property => property.email) }
        }).exec();

        if (existingProperties.length > 0) {
            return res.status(400).json({ message: 'Some properties already exist with these email IDs.' });
        }

        // Get the last propertyId to set new property IDs
        const lastProperty = await Property.findOne().sort({ propertyId: -1 }).exec();
        const startId = lastProperty ? lastProperty.propertyId + 1 : 1;

        // Map through properties to assign propertyId
        const propertiesToAdd = propertiesData.map((property, index) => ({
            ...property,
            propertyId: startId + index // Increment propertyId for each new property
        }));

        const results = await Property.insertMany(propertiesToAdd);
        res.status(201).json(results); // Return the added properties
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding properties' });
    }
});

// GET method to fetch all properties with optional filtering by place
router.get('/allproperties', async (req, res) => {
    const { place, email } = req.query; // Get the place and email from query

    try {
        const query = {};

        if (place) {
            query.place = { $regex: place, $options: 'i' }; // Case-insensitive place filter
        }

        if (email) {
            query.email = email; // Exact email match
        }

        const properties = await Property.find(query).exec(); // Filter by place and/or email
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

// New DELETE method to delete a property by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // Get the property ID from the route parameters

    try {
        const result = await Property.deleteOne({ propertyId: id }).exec(); // Delete property by ID
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Property not found' }); // Handle not found case
        }
        res.status(200).json({ message: 'Property deleted successfully' }); // Return success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting property' }); // Handle errors
    }
});

module.exports = router;
