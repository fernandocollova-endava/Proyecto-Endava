const Sequelize = require('sequelize');

const db = new Sequelize('proyecto_endava:${process.env.ENDAVA_PROJ_DB_PASS}://db:5432/proyecto_endava', {
    logging: false
})

module.exports = db;
