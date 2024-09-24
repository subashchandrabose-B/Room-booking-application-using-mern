const express=require('express')

const {sendQuery,getQueries,getQueryById}=require("../controller/queryController")

const queryRouter=express.Router()

queryRouter.post('/sendQuery',sendQuery)

queryRouter.get('/getQueries',getQueries)

queryRouter.get('/getQueries/:id',getQueryById)


module.exports=queryRouter;

