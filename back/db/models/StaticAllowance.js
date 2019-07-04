const Sequelize = require ("sequelize");
const db  = require ("../index")

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
    fixedAmount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

const EmployeeAllowence = db.define("EmployeeAllowence",{
    amount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    employeeAmount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    datePayment:{
        type: Sequelize.DATE,
        allowNull:false
    },
})

module.exports= {
    StaticAllowance,
    EmployeeAllowence
};