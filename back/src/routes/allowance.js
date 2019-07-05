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
        console.log(req.body.userid) // ID Usuario
        console.log(req.body.allowanceId) // ID Beneficio
        console.log(req.body.employeeAmount) // Monto que ingreso el usuario
        console.log(req.body.observation) // Observación del usuario
        console.log(req.file) // Recibo toda la info del file (By Multer)
    
    // Obtengo el nombre del archivo
    const fileName = req.file.filename; 

    Allowance.findOne({
        where: {
            id: req.body.allowanceId
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

                    // Inserta en la instancia de allowance la instancia de employee
                    instanceAllowance.addEmployee(employee, {
                        through: {
                            amount: instanceAllowance.dataValues.fixedAmount,
                            employeeAmount: req.body.employeeAmount,
                            paymentDate: paymentDate,
                            observation: req.body.observation,
                            receiptPath: fileName,
                            status:'pendiente'
                        }
                    })
                    
                })
        })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})


function paymentDateFn(date, limitDate) {
    let valDate = (date.getDay() <= limitDate)? 1 : 2;
    return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

module.exports = Router