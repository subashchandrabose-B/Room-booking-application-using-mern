const express=require('express')

const bookingRouter=express.Router();

const {confirmBooking,myBookings}=require('../controller/bookingController');

bookingRouter.post('/confirm',confirmBooking);

bookingRouter.get('/myBooking/:id',myBookings)

module.exports=bookingRouter;