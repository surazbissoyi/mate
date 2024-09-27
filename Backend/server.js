const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const mateRoutes = require('./routes/mateRoutes');
const paidUserRoutes = require('./routes/paidUserRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');


const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('/property', propertyRoutes);
app.use('/mates', mateRoutes);
app.use('/paiduser', paidUserRoutes);
app.use('/payment', razorpayRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
