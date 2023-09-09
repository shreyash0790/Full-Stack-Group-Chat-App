const path=require('path');
const fs=require('fs')
const express = require('express')
const cors=require('cors')
const sequelize=require('./Util/Database');
const app = express();
require('dotenv').config();



//routes import
const SignUpRoutes=require('./Routes/SignUp');
const LoginRoutes=require('./Routes/Login')
const ChatRoutes=require('./Routes/Chats')

//models import
const User=require('./Models/SignUp')
const UserChats=require('./Models/Chats')


//middlewares
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
  );
  next();
});

//controllers middlewares
app.use(SignUpRoutes);
app.use(LoginRoutes);
app.use(ChatRoutes);

//model relations
User.hasMany(UserChats);
UserChats.belongsTo(User);

//server config
sequelize
.sync()
.then(result=>{
    app.listen(4000, () => {
        console.log(`Server is running on port 4000`);
    });
})
.catch(err=>{
    console.log(err);
})