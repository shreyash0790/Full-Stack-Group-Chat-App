const express = require('express');
const router = express.Router();
const logincontroller=require('../Controllers/Login');

router.get('/GetUser', logincontroller.GetUser);


module.exports=router;