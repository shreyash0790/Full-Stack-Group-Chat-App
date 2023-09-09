const express = require('express');
const router = express.Router();
const Chatcontroller=require('../Controllers/Chats');
const UserAuthen=require('../Middlewares/Autherizations');


router.post('/UserMsg',UserAuthen.Authentication, Chatcontroller.UserMsg);


module.exports=router;