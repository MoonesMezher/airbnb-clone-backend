const Booking = require('../models/Booking')

// get all user bookings
const getAllBookingsOfUser = async (req, res) => {
    const id = req.user.id;
    try {
        const bookings = await Booking.find({userId: id});
        res.status(200).json(bookings)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// get a single booking
const getSingleBooking = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const booking = await Booking.findOne({userId, _id: id});
        res.status(200).json(booking)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// create a booking
const createBooking = async (req, res) => {
    const userId = req.user.id;
    const { placeId, name, phone, price, checkIn, checkOut, guests } = req.body;
    const data = { userId, placeId, username: name, phoneNumber: phone, price, checkIn, checkOut, guests };

    try {
        const booking = await Booking.create(data);
        res.status(200).json(booking)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// update a booking
const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { name, phone, price, checkIn, checkOut, guests } = req.body;
    const data = {username: name, phoneNumber: phone, price, checkIn, checkOut, guests };

    try {
        const booking = await Booking.findByIdAndUpdate(id, data);

        res.status(200).json(booking)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// update a booking
const removeBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndRemove(id);

        res.status(200).json(booking)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    getAllBookingsOfUser,
    getSingleBooking,
    createBooking,
    updateBooking,
    removeBooking
}