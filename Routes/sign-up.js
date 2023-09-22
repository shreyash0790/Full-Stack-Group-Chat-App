const express = require('express');
const router = express.Router();
const Signcontroller=require('../controllers/signUp');

router.post('/SignUp', Signcontroller.AddUser);


module.exports=router;