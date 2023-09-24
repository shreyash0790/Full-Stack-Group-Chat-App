const uuid = require('uuid');
const Users = require('../models/sign-up');
const UserChat = require('../models/chats');
const GroupMember = require('../models/group-members');
const GroupMedia=require('../models/group-media')
const Groups=require('../models/groups')

const { S3Client, PutObjectCommand , GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { config, S3 } = require('aws-sdk');
const Sharp = require('sharp')

require('dotenv').config();

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.IAM_ACCESS_KEY,
        secretAccessKey: process.env.IAM_SECRET_KEY
    },
    region: process.env.BUCKET_REGION
})



exports.PostUserMsgImages = async (req, res, next) => {

    upload.single("Imagefile")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ error: 'File upload error' });
        }


        try {
            const buffer = await Sharp(req.file.buffer).resize({ height: 192, width: 192, fit: "contain" }).toBuffer()
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: req.file.originalname,
                Body: buffer,
                ContentType: req.file.mimetype

            }

            const command = new PutObjectCommand(params)
            s3.send(command)

            const id = uuid.v4();
            const groupId = req.params.groupId
            const caption= req.body.captioninput
           console.log(groupId)
           console.log(req.users.Id)
                const GroupMem = await GroupMember.findOne({where : { UserId:req.users.Id ,GroupId:groupId}});
 
    
                if(GroupMem){
               const GroupMedias= await GroupMedia.create({ Id:id , MediaName:params.Key, Caption:caption, UserId: req.users.Id, GroupId: groupId})
               res.status(201).json({ Image:GroupMedias, });
                } 
                
                
 



        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

exports.UserMsg = async (req, res, next) => {
    try {
        const Messages = req.body.Messages;
        const groupId = req.params.groupId



        const id = uuid.v4();

        const user = await Users.findOne({ where: { Id: req.users.Id } });
        if (user) {
            const GroupMem = await GroupMember.findOne({ where: { UserId: req.users.Id, GroupId: groupId } });
            if (GroupMem) {
                await UserChat.create({ Id: id, Messages: Messages, UserId: req.users.Id, GroupId: groupId })
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
        const groupId = req.params.groupId
        //to display username 
        const UserNameFetch = await Users.findAll({
            where: { Id: req.users.Id }
        })
        const UserName = UserNameFetch[0].dataValues.Name

        const GroupMem = await GroupMember.findAll({ where: { GroupId: groupId } });
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
                    UserName: message.User.Name,
                    Id: message.Id
                }));

                allMessages.push(...messagesWithUserName);
            }
            res.status(200).json({ Messages: allMessages, CurrentUsername: UserName });
        }



    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }

}





exports.GetUserMsgImages=async (req, res, next) => {
try{
    const groupId = req.params.groupId

const ImageDataModel=await GroupMedia.findAll({where:{UserId:req.users.Id, GroupId:groupId}})

for(posts of ImageDataModel){
const getObjectParams={
    Bucket:process.env.BUCKET_NAME,
    key:ImageDataModel.MediaName
}


const command = new GetObjectCommand(getObjectParams);
const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
posts.imageUrl=url
}
res.status(200).json({ MessageImage:ImageDataModel });


}catch(err){
    console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
}


}















