const Sequelize=require('sequelize');
const sequelize=require('../Util/Database');

const GroupMember=sequelize.define('GroupMember',{
    Id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
     },
     Admin:{
      type:Sequelize.BOOLEAN,
      default:false,
     }
   })
   module.exports=GroupMember;