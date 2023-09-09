const express = require('express');
const router = express.Router();
const Chatcontroller=require('../Controllers/Chats');
const UserAuthen=require('../Middlewares/Autherizations');

router.get('/GetUserMsg', UserAuthen.Authentication,Chatcontroller.GetUserMsg);

router.post('/UserMsg',UserAuthen.Authentication, Chatcontroller.UserMsg);



module.exports=router;