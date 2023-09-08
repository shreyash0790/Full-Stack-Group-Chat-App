const express = require('express');
const router = express.Router();
const Signcontroller=require('../Controllers/SignUp');

router.post('/SignUp', Signcontroller.AddUser);


module.exports=router;