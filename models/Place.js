const { Schema, model, } = require('mongoose');

module.exports = model("Place", new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
    },
    address: {
        type: String,
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
    },
    perks: {
        type: [String],
    },
    rooms: {
        type: Number,
    },
    beds: {
        type: Number
    },
    extraInfo: {
        type: String,
    },
    checkIn: {
        type: String,
    },
    checkOut: {
        type: String,
    },
    maxGuests: {
        type: Number,
    },
    price: {
        type: Number
    },
    per: {
        type: String
    }
}, { timestamps: true }));