// Middleware express
const express = require("express")
const Router = express.Router()

// Funciones adicionales
const MulterFn = require('../functions/multer')

// Import Models
const Allowance = require("../../db/models").StaticAllowance
const Employee = require("../../db/models").Employee

// Import Sequilize
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Insert static allowance
    Router.post('/', MulterFn.single("file"), (req, res) => {
        console.log("soo req del back allowance", req.body)
    // Obtengo el nombre del archivo
    const fileName = req.file.filename; 

    Allowance.findOne({
        where: {
            name: (req.body.allowanceName).toLowerCase()
        }
    })
        .then((instanceAllowance) => {
            Employee.findOne({
                where: {
                    id: req.body.userid
                }
            })
                .then(employee => {
                    // setea la fecha de pago en función de limite y el dia de creación
                    let paymentDate = paymentDateFn(
                        instanceAllowance.dataValues.createdAt, //Fecha creacion
                        instanceAllowance.dataValues.limitDay
                    )
                    instanceAllowance.create({
                        amount: instanceAllowance.dataValues.fixedAmount,
                        employeeAmount: req.body.employeeAmount,
                        paymentDate: paymentDate,
                        observation: req.body.observation,
                        receiptPath: fileName,
                        status:'pendiente',
                        employeeId: employee.id,
                        staticAllowanceId : instanceAllowance.id
                        
                    })
                    // Inserta en la instancia de allowance la instancia de employee
                    // instanceAllowance.addEmployee(employee, {
                    //     through: {
                    //         amount: instanceAllowance.dataValues.fixedAmount,
                    //         employeeAmount: req.body.employeeAmount,
                    //         paymentDate: paymentDate,
                    //         observation: req.body.observation,
                    //         receiptPath: fileName,
                    //         status:'pendiente'
                    //     }
                    // })   
                })
        })
        .then(() => {
            // Responde el nombre del archivo..
            res.json(fileName)})
        .catch(err => res.json(err))
})

Router.get("/api/alowance/search/:id", function(req, res){
    console.log("so el req paramssssssss", req.params.userid )
    Allowance.findAll({
        where:{
            employeeId:req.params.userid
        }
    }).then(allowanceList =>{
        res.send(allowanceList)
    })
})


function paymentDateFn(date, limitDate) {
    let valDate = (date.getDay() <= limitDate)? 1 : 2;
    return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

module.exports = Router