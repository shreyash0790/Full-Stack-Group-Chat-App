const uuid = require('uuid');
const Users = require('../Models/SignUp');
const UserChat = require('../Models/Chats');




exports.UserMsg = async (req, res, next) => {
    try {
        const Messages = req.body.Messages;
        
        

        const id = uuid.v4();

        const user = await Users.findOne({where : { Id:req.users.Id }});
        if(user){
           await UserChat.create({ Id:id , Messages: Messages, UserId: req.users.Id })
                
            }
            res.status(201).json({ Messages: Messages });
       
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.GetUserMsg = async (req, res, next) => {
    try {

        const allMessages = await UserChat.findAll({
            where: {UserId: req.users.Id },
        });


        res.status(200).json({ Messages:allMessages});

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }

}