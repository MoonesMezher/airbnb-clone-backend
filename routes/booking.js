const express = require('express');

const router = express.Router();

// import controllers
const { createBooking, getAllBookingsOfUser, getSingleBooking, updateBooking, removeBooking } = require("../controllers/bookingController");

// import middlewares
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth)

// get all user bookings
router.get('/', getAllBookingsOfUser)

// get a single booking
router.get('/:id', getSingleBooking)

// create a booking
router.post('/', createBooking);

// update a booking
router.put('/update/:id', updateBooking);

// remove a booking
router.delete('/remove/:id', removeBooking);

module.exports = router