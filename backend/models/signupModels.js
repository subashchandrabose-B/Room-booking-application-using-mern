const mongoose =require('mongoose')

const registerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        unique:true
    },
    userPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
registerSchema.index({userEmail:1},{unique:true})
 const user=mongoose.model("datas",registerSchema);

module.exports =user;