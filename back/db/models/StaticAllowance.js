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
    }
})

const EmployeeAllowence = db.define("EmployeeAllowence",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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


// const AllowanceDetail = db.define("allowanceDetail", {

//     price: {
//       type: Sequelize.INTEGER,
//       validate: {
//         notEmpty: true,
//         isNumeric: true
//       }
//     },
//     quantity: {
//       type: Sequelize.INTEGER,
//       validate: {
//         notEmpty: true,
//         isNumeric: true
//       }
//     }
//   });
  

  module.exports= {
      StaticAllowance,
      EmployeeAllowence,
    //   AllowanceDetail
  };