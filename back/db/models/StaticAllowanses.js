const sequelize = require ("sequelize");
const db  = require ("../../db")

const StaticAllowance = db.define("staticAllowance",{

    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    observation:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    amount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    datePayment:{
        type: sequelize.DATE,
        allowNull:false
    },
})

module.exports= StaticAllowance;