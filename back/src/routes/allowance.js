// Middleware express
const express = require("express")
const Router = express.Router()

// Funciones adicionales
const MulterFn = require('../functions/multer')

// Import Models
const Allowance = require("../../db/models").Allowance
const Employee = require("../../db/models").Employee
const AllowanceDetail = require("../../db/models").AllowanceDetail
const Employee_Allowance = require("../../db/models/").Employee_Allowance

// Import Sequilize
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Insert static allowance
Router.post('/', MulterFn.single("file"), (req, res) => {

    // Obtengo el nombre del archivo
    const fileName = req.file.filename;

    Allowance.findOne({
        where: {
            name: (req.body.allowanceName).toLowerCase()
        }
    })
        .then((allowanceInstance) => { // Instancia de Reintegro
            Employee.findOne({
                where: {
                    id: req.body.userid
                }
            })
                .then(employeeInstance => { // Instancia del Empleado
                    // Inserta en la instancia de allowance la instancia de employee
                    // Genera la relacion empleado vs reintegro (Employee_Allowance)
                    allowanceInstance.addEmployee(employeeInstance)

                }).then(() => {
                    // Realizamos un findOne para poder obtener la instancia promisificada de (Employee_Allowance)
                    Employee_Allowance.findOne({
                        where: {
                            employeeId: req.body.userid,
                            allowanceId: allowanceInstance.id
                        }
                    }).then((Employee_Allowance_Instance) => { // Instancia de Employee_Allowance
                        let paymentDate = paymentDateFn(
                            allowanceInstance.dataValues.createdAt, //Fecha creacion
                            allowanceInstance.dataValues.limitDay
                        )
                        // Genero un nuevo registro de detalle en la tabla final AllowanceDetail
                        AllowanceDetail.create({
                            amount: allowanceInstance.dataValues.fixedAmount,
                            employeeAmount: req.body.employeeAmount,
                            paymentDate: paymentDate,
                            observation: req.body.observation,
                            receiptPath: fileName,
                            status: 'pendiente'
                        })
                            .then(AllowanceDetail_Instance => { // Instancia de la creación del registro final
                                //ASIGNA 
                                // Employee_Allowance_Instance (EB)
                                // AllowanceDetail_Instance (BD)

                                AllowanceDetail_Instance.setEmployeeAllowence(Employee_Allowance_Instance)

                            })
                    })
                })
        })
        .then(() => {
            // Responde el nombre del archivo..
            res.json(fileName)
        })
        .catch(err => res.json(err))
})

Router.get("/search/:id", function (req, res) {
    console.log("so el req paramssssssss", req.params.userid)
    Allowance.findAll({
        where: {
            employeeId: req.params.userid
        }
    }).then(allowanceList => {
        res.send(allowanceList)
    })
})

// Ruta para extracción de los beneficios activos
Router.get("/list/", function (req, res) {
    Allowance.findAll({
        where: {
            active: true
        },
        attributes: ['name', 'imgUrl', 'completeName']
    }).then(allowanceList => {
        res.send(allowanceList)
    })
})

function paymentDateFn(date, limitDate) {
    let valDate = (date.getDay() <= limitDate) ? 1 : 2;
    return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

module.exports = Router