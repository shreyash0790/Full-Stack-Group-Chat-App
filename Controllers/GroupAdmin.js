
const GroupMember=require('../Models/GroupMembers');
const Users = require('../Models/SignUp');






exports.removeGroupMembers=async (req, res, next) => {
    try {
        const groupId=req.params.groupId
        const removeUserId=req.body.removeUserId
       



for( const user of removeUserId){
       await GroupMember.destroy({ where: {GroupId:groupId,UserId:user}})
}
res.status(200).json({Stat:"Removed"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




exports.AdmingroupMember=async (req, res, next) => {
    try {
        const groupId=req.params.groupId
        const adminUserId=req.body.adminUserId

for(const user of adminUserId){
 const User=await GroupMember.findOne({where: {GroupId:groupId,UserId:user}})    
 console.log(User) 
if(User){
        await User.update({ Admin:true})
}
}
res.status(200).json({Stat:"Updated"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.VerifyAdmin=async (req, res, next) => {
    try {
        const groupId=req.params.groupId
const Admin= await GroupMember.findAll({where:{UserId:req.users.Id,GroupId:groupId}})
res.status(200).json({Admin: Admin});
       
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.groupMembers=async (req, res, next) => {
    try {
        const groupId=req.params.groupId
const Members= await GroupMember.findAll({where:{GroupId:groupId},
    include: [{ model: Users, attributes: ['Name'] }]})
res.status(200).json({allMembers: Members});
       
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}