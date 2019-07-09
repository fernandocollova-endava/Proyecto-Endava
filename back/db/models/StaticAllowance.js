const Sequelize = require ("sequelize");
const db  = require ("../index")

const StaticAllowance = db.define("staticAllowance",{
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    fixedAmount:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    limitDay:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imgUrl:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    completeName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    active:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
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
    paymentDate:{
        type: Sequelize.DATEONLY,
        allowNull:false
    },
    observation:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    receiptPath:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    status:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
})


module.exports= {
    StaticAllowance,
    EmployeeAllowence
};