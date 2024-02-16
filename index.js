// import important tools
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan')
const cors = require('cors');
const passport = require('passport')

const app = express();
const env = process.env;

// import routes
const userRoute = require('./routes/user');
const placeRoute = require('./routes/place');
const bookingRoute = require('./routes/booking')

// import middleware

// using middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://airbnb-clone,com"]
}));
app.use("/uploads",express.static(__dirname+"/uploads"));
app.use(passport.initialize())

// using routes
app.use('/api/user', userRoute)
app.use('/api/place', placeRoute)
app.use('/api/booking', bookingRoute)
// app.use('/api/auth', passportRoute)

// connected to database
mongoose.connect(env.DB_URL)
    .then(() => {
        app.listen(env.PORT, () => {
            console.log(`Connected to DB, See here => http://localhost:${env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

