const Sequelize=require('sequelize');
const sequelize=require('../Util/Database');

const Groups=sequelize.define('Groups',{
    Id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
     },
   GroupName:{
     type: Sequelize.STRING,
     allowNull:false
    }
   })
   module.exports=Groups;