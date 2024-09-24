const express=require('express');

const {getRequests,giveApproval,rejectApproval,getNotifications,clearNotifications,sendreplynotification}=require('../controller/requestController')
const adminRouter=express.Router();

adminRouter.get('/requests',getRequests);

adminRouter.put('/giveApproval/:id',giveApproval)

adminRouter.delete('/rejectApproval/:id',rejectApproval)

adminRouter.get('/getNotifications/:id',getNotifications)

adminRouter.delete('/clearNotifications/:id',clearNotifications)

adminRouter.post('/replyNotification',sendreplynotification)

module.exports=adminRouter;