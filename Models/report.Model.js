const Connection = require('../config/db.connect');
const {DataTypes,Sequelize} = require('sequelize');

const repo = Connection.define('report',{

    user_id:{
        type:DataTypes.INTEGER,
    
    },
    location:{
        type:DataTypes.STRING,
        defaultValue:null
    },
    description:{
        type:DataTypes.STRING,
        defaultValue:null
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"1",
    }
});
module.exports = repo;