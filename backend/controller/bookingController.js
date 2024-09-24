const BookingModels = require('../models/BookingModel');



const confirmBooking=async (req, res) => {
    const { name, email, days, price, selectedDate,userAuth,image} = req.body;
    console.log(userAuth,name,email,price,selectedDate,image);
  
    if (!name || !email || !days || !price || !selectedDate ||!userAuth||!image) {
      return res.status(400).json({ error: 'Name, email, days, price, and selectedDate are required' });
    }
  
    try {
      // Parse the checkInDate from the selectedDate
      const checkInDate = new Date(selectedDate);
  
      // Calculate the checkOutDate by adding days to the checkInDate
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkInDate.getDate() + days);
  
      // Format the checkOutDate in the same format as the checkInDate (YYYY-MM-DD)
      const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];
  
      // Create a new booking with the calculated checkOutDate
      const newBooking = { name, email, days, price, checkInDate: selectedDate,checkOutDate:formattedCheckOutDate,userAuth,image};
      const savedBooking = await BookingModels.create(newBooking);
      res.json(savedBooking);
    } catch (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const myBookings=async(req,res)=>{
  const {id}=req.params;
  console.log(id);
  if(!id){
    res.status(404).json("cannot get id");
  }
  try{
    const bookingsData=await BookingModels.find({userAuth:id});
    if(bookingsData){
      res.status(200).json(bookingsData);
    }
    else{
      res.status(404).json("No bookings yet");
    }
  }
  catch(err){
     res.status(500).json("Internal error");
  }
}

module.exports={confirmBooking,myBookings}