const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const  userRouter  = require('./routers/userRouter'); // Import the user router
const  homeRouter  = require('./routers/homeRouter'); // Import the home router
const bookingRouter=require('./routers/bookingRouter')
const adminRouter =require('./routers/adminRouter');
const queryRouter=require('./routers/queryHandlingRouter')
const path = require('path');
const fs = require('fs');
//const { sendQuery } = require('./controller/queryController');

const app = express();

app.use(cors({
  origin: ["http://localhost:3001","http://localhost:3002"],
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/logincredentials')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:',err));


// Define the directory where uploaded images will be stored.
// The path is constructed relative to the current directory, placing images in the 'public/images' folder.
const uploadDir = path.join(__dirname, 'public', 'images');
(async () => {
    try {
        await fs.promises.access(uploadDir);
    } catch (err) {
        await fs.promises.mkdir(uploadDir, { recursive: true });
    }
})();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);

// Use the homeRouter for routes under /Home
app.use('/Home', homeRouter);

// Use the homeRouter for routes under /booking

app.use('/booking',bookingRouter);

app.use('/Admin-access',adminRouter);

app.use('/queryHandle',queryRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
