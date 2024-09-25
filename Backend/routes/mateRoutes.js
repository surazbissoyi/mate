const express = require('express');
const Mate = require('../models/Mates');
const router = express.Router();

router.post('/add', async (req, res) => {
    const userData = req.body;
    console.log('Received data:', req.body);

    try {
        // Check if a user with the same email already exists
        const existingUser = await Mate.findOne({ email: userData.email }).exec();
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' }); // Conflict status code
        }

        // Find the last user ID and increment it
        const lastUser = await Mate.findOne().sort({ userId: -1 }).exec();
        const userId = lastUser ? lastUser.userId + 1 : 1;

        const newUser = new Mate({ ...userData, userId });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving user data' });
    }
});

// GET method to fetch all mates
router.get('/allmates', async (req, res) => {
    const { place } = req.query; // Get the place from query
    try {
        const mates = await Mate.find(place ? { place: { $regex: place, $options: 'i' } } : {}).exec(); // Filter by place
        res.status(200).json(mates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// GET method to fetch mate by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
    try {
        const mate = await Mate.findOne({ userId: id }).exec(); // Find mate by ID
        if (!mate) {
            return res.status(404).json({ message: 'Mate not found' }); // Not Found status code
        }
        res.status(200).json(mate); // Return the found mate
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching mate data' });
    }
});

module.exports = router;
