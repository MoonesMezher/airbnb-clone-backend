const { Schema, model } = require('mongoose');

module.exports = model("User", new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniqe: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "profileDefault.jpeg"
    },
    BIO: {
        type: String,
        default: ""
    },
    contact: {
        type: Object,
        default: {whatsapp:"",facebook:"",instagram:"",gmail:""}
    }
}, { timestamps : true }))