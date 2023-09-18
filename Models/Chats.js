const Sequelize=require('sequelize');
const sequelize=require('../Util/Database');

const UsersMsg=sequelize.define('UsersMsg',{
    Id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
     },
   Messages:{
     type: Sequelize.STRING,
     allowNull:false,
    }
   })
   module.exports=UsersMsg;