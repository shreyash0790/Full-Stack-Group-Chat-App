const express = require('express');
const router = express.Router();
const GAdmincontroller=require('../Controllers/GroupAdmin');
const UserAuthen=require('../Middlewares/Autherizations');


router.get('/GroupMember/Admin/verify/:groupId', UserAuthen.Authentication,GAdmincontroller.VerifyAdmin);

router.get('/GroupMembers/:groupId', UserAuthen.Authentication,GAdmincontroller.groupMembers);



router.delete('/GroupMember/Delete/:groupId',GAdmincontroller.removeGroupMembers);
router.put('/GroupMember/Admin/:groupId',GAdmincontroller.AdmingroupMember);









module.exports=router;
