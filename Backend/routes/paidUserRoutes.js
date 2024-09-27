const express = require('express');
const router = express.Router();
const paidUser = require('../models/paidUser');

router.post('/add', async(req, res) => {
    try {
        const {email} = req.body;

        if(!email) {
            return res.status(400).json({message: 'Email is required'});
        }

        const newPaidUser = new paidUser({email});

        await newPaidUser.save();

        res.status(200).json({message: 'Paid user added successfully', data: newPaidUser});
    } catch (error) {
        res.status(500).json({message: 'Faild to add paid user', error: error});
    }
});

router.get('/all', async(req, res) => {
    try {
        const paidUsers = await paidUser.find();
        res.status(200).json({message: 'Paid users fetched successfully', data: paidUsers});
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch paid users', error: error});
    }
}) 

router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await paidUser.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Paid user not found' });
        }

        res.status(200).json({ message: 'Paid user fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch paid user', error });
    }
});


module.exports = router;