// Middleware express
const express = require("express");
const Router = express.Router();

// Funciones adicionales
const MulterFn = require("../functions/multer");

// Import Models
const Allowance = require("../../db/models").Allowance;
const Employee = require("../../db/models").Employee;
const AllowanceDetail = require("../../db/models").AllowanceDetail;
const Employee_Allowance = require("../../db/models/").Employee_Allowance;

// Import Sequilize
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Router.get("/", function(req, res) {
  console.log("enre al ROUERRRRRRRRRRRRRR");
  Allowance.findAll().then(adminAllowances => res.send(adminAllowances));
});

// Insert static allowance
Router.post("/", MulterFn.single("file"), (req, res) => {
  // Obtengo el nombre del archivo
  const fileName = req.file.filename;

  Allowance.findOne({
    where: {
      name: req.body.allowanceName.toLowerCase()
    }
  })
    .then(allowanceInstance => {
      // Instancia de Reintegro
      Employee.findOne({
        where: {
          id: req.body.userid
        }
      })
        .then(employeeInstance => {
          // Instancia del Empleado
          // Inserta en la instancia de allowance la instancia de employee
          // Genera la relacion empleado vs reintegro (Employee_Allowance)
          return allowanceInstance.addEmployee(employeeInstance);
          //IMP en este caso, retorno la relacion, luego al punto then siguiente
          //le paso data (cualquier cosa, no importa que no la use), porque sino le paso nada,
          //ese punto then continua, no espera mi resolucion & si sigue la ejecucion!!!
        })
        .then(data => {
          // Realizamos un findOne para poder obtener la instancia promisificada de (Employee_Allowance)
          Employee_Allowance.findOne({
            where: {
              employeeId: req.body.userid,
              allowanceId: allowanceInstance.id
            }
          }).then(Employee_Allowance_Instance => {
            // Instancia de Employee_Allowance
            console.log(
              "so la allowance insancie",
              Employee_Allowance_Instance
            );
            let paymentDate = paymentDateFn(
              allowanceInstance.dataValues.createdAt, //Fecha creacion
              allowanceInstance.dataValues.limitDay
            );
            // Genero un nuevo registro de detalle en la tabla final AllowanceDetail
            AllowanceDetail.create({
              amount: allowanceInstance.dataValues.fixedAmount,
              employeeAmount: req.body.employeeAmount,
              paymentDate: paymentDate,
              observation: req.body.observation,
              receiptPath: fileName,
              status: "pendiente"
            }).then(AllowanceDetail_Instance => {
              // Instancia de la creación del registro final
              //ASIGNA
              // Employee_Allowance_Instance (EB)
              // AllowanceDetail_Instance (BD)

              AllowanceDetail_Instance.setEmployeeAllowance(
                Employee_Allowance_Instance
              );
              AllowanceDetail_Instance.setAllowance(
                Employee_Allowance_Instance.allowanceId
              );
            });
          });
        });
    })
    .then(() => {
      // Responde el nombre del archivo..
      res.json(fileName);
    })
    .catch(err => res.json(err));
});

//Ruta para busqueda + filtro de todos los beneficios de un empleado
Router.get("/search/", function(req, res) {
  Employee.findOne({
    where: {
      id: req.query.userId
    }
  }).then(employee => {
    Employee_Allowance.findAll({
      where: {
        employeeId: employee.id
      }
    }).then(employee_allowances => {
      //recibo arra& con la list a emp-allo

      var arraIds = []; //guardo solo los id
      var arraAllo = [];
      for (let i = 0; i < employee_allowances.length; i++) {
        arraIds.push(employee_allowances[i].id);
        arraAllo.push(employee_allowances[i].allowanceId);
      }
      !req.query.allowanceId //pregunto si existe allowanceId, para poder filtrar por allowance de ser necesario
        ? AllowanceDetail.findAll({
            where: {
              employeeAllowanceId: {
                [Op.in]: arraIds //ese filtro me busca esos id del array en mi tabla AllowanceDetail
              }
            },
            include: [
              //le incluyo el campo Allowance, para eso primero uve que esablecerle una relacion AllowanceDeail
              //ademas de setearle al allowanceDetail el Allowance
              {
                model: Allowance,
                as: "allowance"
              }
            ]
          }).then(alloResponse => {
            res.send(alloResponse);
          })
        : AllowanceDetail.findAll({
            where: {
              employeeAllowanceId: {
                [Op.in]: arraIds //ese filtro me busca esos id del array en mi tabla AllowanceDetail
              }
            },
            include: [
              {
                model: Allowance,
                as: "allowance",
                where: {
                  id: req.query.allowanceId // esto me filtra por allowance
                }
              }
            ]
          }).then(alloResponse => {
            res.send(alloResponse);
          });
    });
  });
});

// Ruta para extracción de los beneficios activos
Router.get("/list/", function(req, res) {
  Allowance.findAll({
    where: {
      active: true
    },
    attributes: ["name", "imgUrl", "completeName"]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

function paymentDateFn(date, limitDate) {
  let valDate = date.getDay() <= limitDate ? 1 : 2;
  return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

module.exports = Router;
