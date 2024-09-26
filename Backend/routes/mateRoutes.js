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

router.post('/bulk-add', async (req, res) => {
    const matesData = req.body;

    try {
        const results = await Mate.insertMany(matesData);
        res.status(201).json(results); // Return the added mates
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding mates' });
    }
});



router.get('/allmates', async (req, res) => {
    const { place, email } = req.query; // Get the place and email from query

    try {
        const query = {};
        
        if (place) {
            query.place = { $regex: place, $options: 'i' }; // Case-insensitive place filter
        }
        
        if (email) {
            query.email = email; // Exact email match
        }

        const mates = await Mate.find(query).exec(); // Filter by place and/or email
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

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // Get the userId from the URL parameters
    try {
        const mate = await Mate.findOneAndDelete({ userId: id }).exec(); // Find and delete the mate by userId

        if (!mate) {
            return res.status(404).json({ message: 'Mate not found' }); // Not Found status code
        }

        res.status(200).json({ message: 'Mate deleted successfully' }); // Return success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting mate' }); // Internal Server Error
    }
});

module.exports = router;
