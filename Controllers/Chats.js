const uuid = require('uuid');
const Users = require('../Models/SignUp');
const UserChat = require('../Models/Chats');
const GroupMember=require('../Models/GroupMembers');
const io=require('../Util/Websocket');



exports.UserMsg = async (req, res, next) => {
    try {
        const Messages = req.body.Messages;
        const groupId=req.params.groupId
        
        

        const id = uuid.v4();

        const user = await Users.findOne({where : { Id:req.users.Id }});
        if(user){
            const GroupMem = await GroupMember.findOne({where : { UserId:req.users.Id ,GroupId:groupId}});
            if(GroupMem){
           await UserChat.create({ Id:id , Messages: Messages, UserId: req.users.Id, GroupMemberId:GroupMem.Id })// mistake here (prob)
            } 
            }
            res.status(201).json({ Messages: Messages, });
       
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



exports.GetUserMsg = async (req, res, next) => {
    try {
        const groupId=req.params.groupId
         //to display username 
         const UserNameFetch=await Users.findAll({
            where: {Id: req.users.Id }
        })
        const UserName=UserNameFetch[0].dataValues.Name
    
        const GroupMem = await GroupMember.findAll({where : { GroupId:groupId}});
        if (GroupMem) {
            let allMessages = [];
            for (GroupId of GroupMem) {
                const messages = await UserChat.findAll({
                    where: { GroupMemberId: GroupId.dataValues.Id },
                    order: [['CreatedAt', 'ASC']],
                    include: [{ model: Users, attributes: ['Name'] }]
                });
        
                // Iterate through each message and replace the `Username` with `Name`
                const messagesWithUserName = messages.map(message => ({
                    MessageContent: message.Messages,
                    UserName: message.User.Name ,
                    Id:message.Id
                }));
        
                allMessages.push(...messagesWithUserName);
            }
            res.status(200).json({ Messages: allMessages,CurrentUsername:UserName });
        }
      
       

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }

}



















