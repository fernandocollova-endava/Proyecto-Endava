// Middleware express
const express = require("express");
const Router = express.Router();

// Funciones adicionales
const MulterFn = require("../functions/multer");

// Import Models
const Allowance = require("../../db/models").Allowance;
const Employee = require("../../db/models").Employee;
const AllowanceDetail = require("../../db/models").AllowanceDetail;

// Import Sequilize
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Router.get("/", function (req, res) {
  Allowance.findAll({
    where: { active: true },
    order: [["id", "asc"]],
    attributes: ["name", "imgUrl", "completeName", "id", "fixedAmount"]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

Router.get("/admin", function (req, res) {
  AllowanceDetail.findAll({
    include: [
      {
        model: Employee,
        as: "employeeDetail",
      },
      {
        model: Allowance,
        as: "allowanceDetail",
      }
    ]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});


// Insert allowance
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

          let paymentDate = paymentDateFn(
            allowanceInstance.dataValues.createdAt, //Fecha creacion
            allowanceInstance.dataValues.limitDay
          );

          // Calculo de total reintegro:
          var totalAmountFixed = allowanceInstance.dataValues.fixedAmount;
          var totalEmployeeAmount = req.body.employeeAmount
          var totalAmount = (totalEmployeeAmount > totalAmountFixed) ? totalAmountFixed : totalEmployeeAmount;

          // Genero un nuevo registro de detalle en la tabla final AllowanceDetail
          AllowanceDetail.create({
            amount: totalAmount,
            employeeAmount: totalEmployeeAmount,
            limitAmount: totalAmountFixed,
            paymentDate: paymentDate,
            observation: req.body.observation,
            receiptPath: fileName,
            status: "pending"
          }).then(AllowanceDetail_Instance => {

            // Instancia de la creación del registro final Empleado
            AllowanceDetail_Instance.setEmployeeDetail(
              employeeInstance.id
            );
            // Instancia de la creación del registro final Beneficio
            AllowanceDetail_Instance.setAllowanceDetail(
              allowanceInstance.id
            );
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
Router.get("/search/", function (req, res) {
  let query = (req.query.allowanceId) ? { id: req.query.allowanceId } : {}
  AllowanceDetail.findAll({
    attributes: ['amount', 'employeeAmount', 'limitAmount', 'paymentDate', 'status', 'receiptPath', 'adminComment', 'id'],
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ['name'],
        where: {
          id: req.query.userId
          //[Op.in]: arraIds //ese filtro me busca esos id del array en mi tabla AllowanceDetail
        }
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: query,
      }
    ]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});


Router.get("/search/all", function (req, res) {
  AllowanceDetail.findAll({
    where: {
      status: "pending"
    },
    include: [
      {
        model: Allowance,
        as: "allowanceDetail"
      },
      {
        model: Allowance,
        as: "allowanceDetail",
      }
    ]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

function paymentDateFn(date, limitDate) {
  let valDate = date.getDay() <= limitDate ? 1 : 2;
  return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

module.exports = Router;
