const Sequelize = require('sequelize');

const db = new Sequelize('postgres:${process.env.ENDAVA_PROJ_DB_PASS}://db:5432/endavaDb', {
    logging: false
})

module.exports = db;
