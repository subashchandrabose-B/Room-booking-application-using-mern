const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: String,
        required: true
    },
    userAuth: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model("bookingdetails", BookingSchema);

module.exports = Booking;
