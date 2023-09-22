const express = require('express');
const router = express.Router();
const Groupcontroller=require('../controllers/groups');
const GroupInvitecontroller=require('../controllers/groups');
const UserAuthen=require('../middlewares/autherizations');

router.get('/getGroupData', UserAuthen.Authentication,Groupcontroller.getGroupData);

router.post('/groupCreate',UserAuthen.Authentication, Groupcontroller.CreateGroup);

router.post('/Groups/Confirm/Invite/:groupId',UserAuthen.Authentication,GroupInvitecontroller.GroupConfirmInvite)

router.get('/Groups/Users/Invite',UserAuthen.Authentication,GroupInvitecontroller.GroupUsersInvite)




module.exports=router;