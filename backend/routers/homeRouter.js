const express = require('express');
const multer = require('multer');
const path = require('path');
const  {addHome,getHomes,getMyHome,getHomeById,updateHome,deleteHome,updateAvailableDate,}= require('../controller/homeController'); // Adjust path if needed

const homeRouter = express.Router(); // Correctly name the router

const uploadDir = path.join(__dirname, '../public', 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

homeRouter.post('/addHome',upload.single('file'),addHome);
homeRouter.get('/getHomes',getHomes);
homeRouter.get('/getMyHome',getMyHome);
homeRouter.get('/getHome/:id',getHomeById);
homeRouter.put('/updateHome/:id',updateHome);
homeRouter.delete('/deleteHome/:id',deleteHome);
homeRouter.put('/updateDates/:id',updateAvailableDate)

module.exports =  homeRouter ; // Export as an object with homeRouter property

