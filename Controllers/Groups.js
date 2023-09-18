const uuid = require('uuid');
const Users = require('../Models/SignUp');
const Groups=require('../Models/Groups');
const GroupMember=require('../Models/GroupMembers');


exports.CreateGroup=async (req, res, next) => {
    try {
     const Groupname=req.body.GroupName

     const id = uuid.v4();
     const ID=uuid.v4();

     const user = await Users.findOne({where : { Id:req.users.Id }});
     if(user){
        const Group= await Groups.create({ Id:id, GroupName: Groupname, UserId: req.users.Id })
            if(Group){

         await GroupMember.create({Id:ID, UserId: req.users.Id, GroupId:Group.Id,Admin:true })
            }
         }
         res.status(201).json({ Group: Groupname });



    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getGroupData=async (req, res, next) => {
    try {

        const allGroups = await GroupMember.findAll({
            where: {UserId: req.users.Id },
            include: [{ model: Groups, attributes: ['GroupName'] }]
         
        });


        res.status(200).json({ GroupNames:allGroups});

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.GroupUsersInvite=async (req, res, next) => {
    try {
        const allUsers=await Users.findAll();


        res.status(200).json({ allUsers:allUsers});

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.GroupConfirmInvite=async (req, res, next) => {
    try {
        const groupId=req.params.groupId
        const UserId=req.body.UserId
        const members = [];
       
for(user of UserId){
    const id=uuid.v4();
        const Members=await GroupMember.create({Id:id, UserId:user , GroupId:groupId,Admin:false})
        members.push(Members);
}
res.status(200).json({Members:members});


    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
