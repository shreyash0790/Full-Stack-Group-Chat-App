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
const GroupsRoutes=require('./Routes/Groups');
const GroupAdminRoutes=require('./Routes/GroupAdmin');

//models import
const User=require('./Models/SignUp')
const UserChats=require('./Models/Chats')
const Groups=require('./Models/Groups')
const GroupMember=require('./Models/GroupMembers');


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
app.use(GroupAdminRoutes);
app.use(ChatRoutes);
app.use(GroupsRoutes);


//model relations
User.hasMany(UserChats);
UserChats.belongsTo(User);

User.hasMany(Groups);
Groups.belongsTo(User);

User.hasMany(GroupMember);
GroupMember.belongsTo(User);

Groups.hasMany(GroupMember)
GroupMember.belongsTo(Groups)

GroupMember.hasMany(UserChats);
UserChats.belongsTo(GroupMember);


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