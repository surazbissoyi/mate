const express = require('express');
const router = express.Router();
const paidUser = require('../models/paidUser');

router.post('/addPaidUser', async(req, res) => {
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

module.exports = router;