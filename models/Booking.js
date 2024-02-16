const { Schema, model } = require('mongoose')

module.exports = model("Booking", new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: "Place"
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    }
}, { timestamps: true }))