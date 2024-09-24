const Query = require('../models/queryModels');

const sendQuery = async (req, res) => {
    const { name, email, subject, message, userId} = req.body;
    try {
        if (!name || !email || !subject || !message || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const result = await Query.create({
            name,
            email,
            subject,
            message,
            userId
        });

        if (!result) {
            return res.status(400).json({ message: "Failed to save the query to the database" });
        }

        return res.status(200).json({ message: "Successfully added query" });
    } catch (error) {
        console.error("Error occurred while saving query:", error); // Logging error
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getQueries=async(req,res)=>{
    try{
        const result=await Query.find({});
        if(result){
            return res.status(200).json(result)
        }
        else{
            return res.status(404).json("no data Available")
        }
    }
    catch(error){
        return res.status(500).json("something wrong with the server")
    }
}

const getQueryById=async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await Query.findById(id);
        if(result){
            return res.status(200).json(result)
        }
        else{
            return res.status(404).json("no data Available")
        }
    }
    catch(error){
        return res.status(500).json("something wrong with the server")
    }
}


module.exports = { sendQuery,getQueries,getQueryById };
