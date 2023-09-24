const path=require('path');
const fs=require('fs')
const express = require('express')
const cors=require('cors')
const sequelize=require('./util/database');
const app=express();

const io=require('socket.io')(3000,{
  cors:{
    origin:['http://localhost:4000']
  }
})


io.on("connection", (socket)=>{
  socket.on("User-Msg", (data)=>{
    io.emit("messages",data)
  })
})


//routes import
const SignUpRoutes=require('./routes/sign-up');
const LoginRoutes=require('./routes/login')
const ChatRoutes=require('./routes/chats')
const GroupsRoutes=require('./routes/groups');
const GroupAdminRoutes=require('./routes/group-admin');


//models import
const User=require('./models/sign-up')
const UserChats=require('./models/chats')
const Groups=require('./models/groups')
const GroupMember=require('./models/group-members');
const GroupMedia=require('./models/group-media')


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

User.hasMany(GroupMedia);
GroupMedia.belongsTo(User);

Groups.hasMany(GroupMedia);
GroupMedia.belongsTo(Groups);

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