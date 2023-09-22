const express = require('express');
const router = express.Router();
const Signcontroller=require('../controllers/SignUp');

router.post('/SignUp', Signcontroller.AddUser);


module.exports=router;