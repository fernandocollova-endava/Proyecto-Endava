const Sequelize = require('sequelize');

const endava_proj_db_pass = process.env.ENDAVA_PROJ_DB_PASS

const db = new Sequelize('proyecto_endava:${endava_proj_db_pass}://db:5432/proyecto_endava', {
    logging: false
})

module.exports = db;
