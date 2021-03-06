const Connection = require('../config/db.connect');
const { DataTypes, Sequelize } = require('sequelize');
// var Sequelize = require('sequelize');
// var EncryptedField = require('sequelize-encrypted');
// var enc_fields = EncryptedField(Sequelize, 'secret');

const User = Connection.define('user', {
    name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: null
    },

    password: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    otp: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    verify: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: "1"
    },

    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    },
    deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null
    }

});


module.exports = User;