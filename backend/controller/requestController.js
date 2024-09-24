
const RegisterModels = require('../models/RegisterModels');
const OwnerNotifyModels = require('../models/OwnerNotifyModel');
const path = require('path');

const uploadDir = path.join(__dirname, '../public', 'images');

// Fetch all pending requests
const getRequests = async (req, res) => {
    try {
        const requestsList = await RegisterModels.find({ approval: false });
        if (requestsList && requestsList.length > 0) {
            return res.status(200).json(requestsList);
        } else {
            return res.status(404).json("No requests found");
        }
    } catch (error) {
        return res.status(500).json("Internal error");
    }
};

// Approve a registration request
const giveApproval = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json("ID is required");
    }

    try {
        const data = await RegisterModels.findById(id);
        if (data) {
            // return res.status(404).json("Request not found");
            console.log(data)
        }

        const result = await RegisterModels.findByIdAndUpdate(id, { approval: true });
        if (result) {
            console.log("sssss222")
            const notify=await OwnerNotifyModels.create({
                userId: data.uniqueId,
                homeId: data._id,
                message: `Your request to register Home ${data.name} is accepted`
            });
            if(notify){
                console.log("sssss")
                return res.status(200).json("success")
            }
            else{
                console.log("sssss111")
                return res.status(404).json("notification not sended")
            }
        }
    } catch (error) {
        console.log("catheched")
        return res.status(500).json({ message: error.message });
    }
};

// Reject a registration request
const rejectApproval = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json("ID is required");
    }

    try {
        const data = await RegisterModels.findById(id);
        if (!data) {
            return res.status(404).json("Request not found");
        }
        const result = await RegisterModels.findByIdAndDelete(id);
        if (result) {
            await OwnerNotifyModels.create({
                userId: data.uniqueId,
                homeId: data._id,
                message: `Your request to register Home ${data.name} is rejected`
            });
            return res.status(200).json("success");
        } else {
            return res.status(500).json("Failed to reject the request");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getNotifications=async(req,res)=>{
    const {id}=req.params;
    try{
        const notifications=await OwnerNotifyModels.find({userId:id})
        if(notifications){
            return res.status(200).json(notifications)
        }
    }
    catch(error){
        return res.status(500).json("internal error");
    }
}

const clearNotifications = async (req, res) => {
    const { id } = req.params; // Extract userId from the request parameters

    console.log("Clearing notifications for user ID:", id);

    try {
        // Delete notifications where userId matches the provided ID
        const result = await OwnerNotifyModels.deleteMany({ userId: id });

        if (result.deletedCount > 0) {
            console.log("Notifications cleared successfully.");
            return res.status(200).json("success");
        } else {
            console.log("No notifications found for the user.");
            return res.status(404).json("No notifications found");
        }
    } catch (error) {
        console.error("Error while clearing notifications:", error);
        return res.status(500).json("Internal error");
    }
};

const sendreplynotification = async (req, res) => {
    // Extract userId from the request body
    const { userId } = req.body;  // Destructure the userId directly
    console.log(userId);
    
    // Check if userId is valid (optional, but good for error handling)
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: "Invalid userId" });
    }

    try {
        const result = await OwnerNotifyModels.create({
            userId: userId,  // Now this will correctly pass the userId as a string
            message: "your query has been solved, check your email"
        });
        
        if (result) {
            return res.status(200).json("success");
        }
    } catch (error) {
        console.log({ message: error });
        return res.status(500).json({ message: error });
    }
};



module.exports = { getRequests, giveApproval, rejectApproval,getNotifications,clearNotifications,sendreplynotification};
