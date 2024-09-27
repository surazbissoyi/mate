// routes/razorpay.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
require('dotenv').config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key id
  key_secret: process.env.RAZORPAY_KEY_SECRET // Your Razorpay key secret
});

// Create Payment Order
router.post('/pay', async (req, res) => {
  const { amount, currency } = req.body; // Amount in smallest currency unit (e.g., paise)

  const options = {
    amount, // amount in paise
    currency,
    receipt: 'receipt#1',
    payment_capture: 1, // Auto capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
