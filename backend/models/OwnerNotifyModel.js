const mongoose=require('mongoose')

const notifiSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    homeId:{
        type:String,
    }
    ,message:{
        type:String,
        required:true
    }
})
const Notifyschema=mongoose.model("notification",notifiSchema)

module.exports=Notifyschema;