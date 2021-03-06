const { Sequelize } = require('sequelize');
const { Mysql } = require('./dbconfig')

const sequelize = new Sequelize(Mysql.DB, Mysql.username, Mysql.password, {
    host: Mysql.host,
    dialect: Mysql.dialect,
    logging: false,
    define: {
        freezeTableName: true
    }
});

try {
    sequelize.authenticate();
    console.log('your DataBase Connection successfully');
} catch (error) {
    console.error('Unable to connect!:', error);
}

sequelize.sync({
    // force: true 
});


module.exports = sequelize;