const express = require('express');
const router = express.Router();
const Chatcontroller=require('../controllers/chats');
const UserAuthen=require('../middlewares/autherizations');



router.get('/GetUserMsg/groupChat/:groupId', UserAuthen.Authentication,Chatcontroller.GetUserMsg);

router.post('/UserMsg/groupChat/:groupId',UserAuthen.Authentication, Chatcontroller.UserMsg);

router.post('/UserMsg/groupChat/Images/:groupId',UserAuthen.Authentication, Chatcontroller.PostUserMsgImages)



module.exports=router;