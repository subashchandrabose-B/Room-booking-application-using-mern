const mongoose=require('mongoose')

const descriptionSchema = new mongoose.Schema({
    rooms: {
      type: String,
      required: true,
    },
    BedRoom: {
      type: String,
      required: true,
    },
    Wifi: {
      type: String,
      required: true,
    },
    Parking: {
      type: String,
      required: true,
    },
    Laundry: {
      type: String,
      required: true,
    },
  });

const addressSchema = new mongoose.Schema({
    apartmentNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  });
  

const registerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:descriptionSchema,
        required:true
    },
    image:{
        type:String,
    },
    address:{
        type:addressSchema,
        required:true
    },
    uniqueId:{
        type: String,
        required: true,
    },
     bookedDates: {
        type: [String], // Array of strings to store dates in "YYYY-MM-DD" format
        validate: {
            validator: function(array) {
                return array.every(date => /^\d{4}-\d{2}-\d{2}$/.test(date));
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    approval:{
      type:Boolean,
      required:true
    },
    rejectionStatus:{
      tyle:String
    }
})

const details=mongoose.model("housedata",registerSchema);
 
module.exports =details