const RegisterModels = require('../models/RegisterModels');
const path = require('path');

const uploadDir = path.join(__dirname, '../public', 'images');

const addHome = async (req, res) => {
    const { name, price, description, uniqueId, address } = req.body;
    const file = req.file;
    if (!name || !price || !description || !file || !uniqueId || !address) {
        return res.status(400).json({ error: "All fields need to be filled" });
        console.log("file required")
    }
    try {
        const parsedDescription = JSON.parse(description);
        const parsedAddress = JSON.parse(address);
        const newHome = {
            name: name,
            price: price,
            description: parsedDescription,
            image: file.filename,
            address: parsedAddress,
            uniqueId: uniqueId,
            approval:false
        };
        const savedHome = await RegisterModels.create(newHome);
        res.json(savedHome);
    } catch (error) {
        console.error("Error while posting data", error);
        res.status(400).json({ error: error.message });
    }
};

const getHomes = async (req, res) => {
    try {
      const selectedDate = req.query.selectedDate;
  
      // Ensure selectedDate is provided
      if (!selectedDate) {
        return res.status(400).json({ message: 'Selected date is required' });
      }
  
      // Query to find homes where selectedDate is not in the bookedDates array
      const datas = await RegisterModels.find({
        appproval:true,
        bookedDates: { $nin: [selectedDate] }
      });
  
      res.json(datas);
    } catch (err) {
      console.error("Error while fetching homes:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

const getMyHome = async (req, res) => {
    const id=req.query.id;
    console.log(id)
    if (!id) {
        return res.status(400).json({ error: 'UniqueId is required' });
    }

    try {
        const datas = await RegisterModels.find({ uniqueId: id });
        if (datas.length === 0) {
            return res.status(404).json({ error: 'No data found for the given UniqueId' });
        }
        res.json(datas);
    } catch (err) {
        console.error("Error while fetching users:", err);
        res.status(500).json({ error: err.message });
    }
};

const getHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await RegisterModels.findById(id);
        res.status(200).send(user);
    } catch (err) {
        res.status(200).send({ message: err.message });
    }
};

const updateHome = async (req, res) => {
    const { name, price, address, description } = req.body;
    const { id } = req.params;
    if (!name || !price || !description || !address) {
        return res.status(400).json({ error: "All fields need to be filled" });
    }
    try {
        const parsedAddress = JSON.parse(address);
        const parsedDescription = JSON.parse(description);
        const updateData = {
            name: name,
            price: price,
            description: parsedDescription,
            address: parsedAddress,
        };
        const result = await RegisterModels.findByIdAndUpdate(id, updateData);
        if (result) {
            res.json(result);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteHome = async (req, res) => {
    const { id } = req.params;
    try {
        const resultDelete = await RegisterModels.findByIdAndDelete(id);
        if (resultDelete) {
            res.json("success");
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateAvailableDate = async (req, res) => {
    try {
      const { id } = req.params; // Get the home ID from the URL params
      const { selectedDate,days } = req.body; // Get selectedDate and days from the request body
      if(!days){
        console.log("date not recieved")
        return res.status(400).json("days and dates required")
      }
      // Generate an array of dates from selectedDate to the number of days
      const datesToBlock = [];
      const startDate = new Date(selectedDate);
  
      for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        datesToBlock.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      }
  
      // Update the home document with the unavailable dates
      const updatedHome = await RegisterModels.findByIdAndUpdate(
        id,
        { $addToSet: { bookedDates: { $each: datesToBlock } } }, // Add dates if they don't already exist
        { new: true } // Return the updated document
      );
      if (!updatedHome) {
        return res.status(404).json({ message: 'Home not found' });
      }
      console.log(datesToBlock);
      res.status(200).json({ message: 'Dates updated successfully', updatedHome });
    } catch (err) {
      console.error('Error updating available dates:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

module.exports = {
    addHome,
    getHomes,
    getMyHome,
    getHomeById,
    updateHome,
    deleteHome,
    updateAvailableDate
};
