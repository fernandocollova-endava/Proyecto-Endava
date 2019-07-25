// Middleware express
const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");

// Funciones adicionales
const MulterFn = require("../functions/multer");

// Import Models
const Allowance = require("../../db/models").Allowance;
const Employee = require("../../db/models").Employee;
const AllowanceDetail = require("../../db/models").AllowanceDetail;
// Import Sequilize
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

Router.get("/", function(req, res) {
  //trae las allowances generales
  Allowance.findAll({
    where: {
      active: true,
      name: {
        [Op.ne]: "book"
      }
    },
    order: [["id", "asc"]],
    attributes: ["name", "imgUrl", "completeName", "id", "fixedAmount"]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

Router.get("/admin", function(req, res) {
  //trae las allowances que se ven el admin panel
  AllowanceDetail.findAll({
    include: [
      {
        model: Employee,
        as: "employeeDetail"
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: {
          name: {
            [Op.ne]: "book"
          }
        }
      }
    ]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});

Router.get("/book", function(req, res) {

  console.log("soy req", req.query.adminPath)

  let queryEmployee = req.query.adminPath == "true"
    ? { id: { [Op.ne]: req.query.userId } } // Trae todos los usuarios excepto el propio
    : { id: req.query.userId }; 

  Allowance.findOne({
    
    where: {
      name: "book"
    }
  }).then(book => {
    AllowanceDetail.findAll({
      include: [
        {
          model: Employee,
          as: "employeeDetail",
          attributes: ["name"],
          queryEmployee
        },
        {
          model: Allowance,
          as: "allowanceDetail",
          attributes: ["name", "id"],
        }
      ],
      // attributes: [
      //   "amount",
      //   "employeeAmount",
      //   "limitAmount",
      //   "paymentDate",
      //   "installments",
      //   "status",
      //   "receiptPath",
      
      // ],
      where: {
        allowanceDetailId: book.id
      }
    }).then(bookAllowance => { 
      res.send(bookAllowance)});
  });
});

// Insert allowance
Router.post("/", MulterFn.single("file"), (req, res) => {
  //crea todas las allowances, generales y book
  const fileName = req.file.filename;

  Allowance.findOne({
    where: {
      name: req.body.allowanceName.toLowerCase()
    }
  }).then(allowanceInstance => {
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
        if (req.body.allowanceName == "book") {
          // si es book
          let paymentDate = paymentDateFn(
            allowanceInstance.dataValues.createdAt, //Fecha creacion
            allowanceInstance.dataValues.limitDay
          );

          // Calculo de total reintegro:
          var totalAmountFixed = allowanceInstance.dataValues.fixedAmount;
          var totalEmployeeAmount = req.body.employeeAmount;
          var totalAmount =
            totalEmployeeAmount > totalAmountFixed
              ? totalAmountFixed
              : totalEmployeeAmount;
          var remainingBookAmount = totalEmployeeAmount; // calculo el remanente
          var cant = Math.ceil(remainingBookAmount / totalAmountFixed); // calculo en cuantas "partes" se pagara ese remanente

          for (let i = 0; i <= cant; i++) {
            //itero esas "n" partes, por cada pasada creo
            // un allowance de book
            // evito el valor negativo
            if (remainingBookAmount < 0) break;

            AllowanceDetail.create({
              amount: totalAmount,
              employeeAmount: totalEmployeeAmount,
              installments: `${i + 1}/${cant}`,
              limitAmount: totalAmountFixed,
              paymentDate: moment(paymentDate, "DD-MM-YYYY").add(i, "months"),
              remainingBookAmount: remainingBookAmount,
              observation: req.body.observation,
              receiptPath: fileName,
              status: "pending"
            }).then(AllowanceDetail_Instance => {
              // Instancia de la creación del registro final Empleado
              AllowanceDetail_Instance.setEmployeeDetail(employeeInstance.id);
              // Instancia de la creación del registro final Beneficio
              AllowanceDetail_Instance.setAllowanceDetail(allowanceInstance.id);
            });
            remainingBookAmount = remainingBookAmount - totalAmountFixed; //actualizo el reiamning en cada pasada
            remainingBookAmount >= totalAmountFixed //finalmente, si remaaining es mayor totalAmount, el valor
              ? (totalAmount = totalAmountFixed) // se topea en el maximo (totalAmountFixed)
              : (totalAmount = remainingBookAmount); //si es menor, igualo al valor remanente.
          }
        } else {
          //si es un allawance normal
          let paymentDate = paymentDateFn(
            allowanceInstance.dataValues.createdAt, //Fecha creacion
            allowanceInstance.dataValues.limitDay
          );
          var totalAmountFixed = allowanceInstance.dataValues.fixedAmount;
          var totalEmployeeAmount = req.body.employeeAmount;
          var totalAmount =
            totalEmployeeAmount > totalAmountFixed
              ? totalAmountFixed
              : totalEmployeeAmount;

          // Genero un nuevo registro de detalle en la tabla final AllowanceDetail
          AllowanceDetail.create({
            amount: totalAmount,
            employeeAmount: totalEmployeeAmount,
            installments: "1",
            limitAmount: totalAmountFixed,
            paymentDate: paymentDate,
            observation: req.body.observation,
            receiptPath: fileName,
            status: "pending"
          }).then(AllowanceDetail_Instance => {
            // Instancia de la creación del registro final Empleado
            AllowanceDetail_Instance.setEmployeeDetail(employeeInstance.id);
            // Instancia de la creación del registro final Beneficio
            AllowanceDetail_Instance.setAllowanceDetail(allowanceInstance.id);
          });
        }
      })
      .then(data => {
        // Responde el nombre del archivo..
        res.json(fileName);
      })
      .catch(err => res.json(err));
  });
});

//Ruta para busqueda + filtro de todos los beneficios de un empleado
Router.get("/search/", function(req, res) {
  let queryAllowance = req.query.allowanceId
    ? { id: req.query.allowanceId }
    : {}; // Consulta si hay filtro de beneficios
  let queryEmployee =
    req.query.allUser == "true"
      ? { id: { [Op.ne]: req.query.userId } } // Trae todos los usuarios excepto el propio
      : { id: req.query.userId }; // Consulta si hay filtro de empleados
  let queryStatus = req.query.status ? { status: req.query.status } : {}; // Consulta si hay filtro de status

  AllowanceDetail.findAll({
    attributes: [
      "amount",
      "employeeAmount",
      "limitAmount",
      "paymentDate",
      "status",
      "receiptPath",
      "adminComment",
      "id"
    ],
    where: queryStatus,
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name"],
        where: queryEmployee
        //[Op.in]: arraIds //ese filtro me busca esos id del array en mi tabla AllowanceDetail
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: queryAllowance
      }
    ],
    order: [["id", "DESC"]]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});

// Ruta fetch history employee / allowance ( limit 10 )
Router.get("/history/:employeeId/:allowanceId", function(req, res) {
  AllowanceDetail.findAll({
    attributes: [
      "paymentDate",
      "installments",
      "amount",
      "limitAmount",
      "employeeAmount",
      "status"
    ],
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: [],
        where: {
          id: req.params.employeeId
        }
      },
      {
        model: Allowance,
        as: "allowanceDetail",
        where: {
          id: req.params.allowanceId
        },
        attributes: []
      }
    ],
    limit: 10,
    order: [["id", "DESC"]]
  }).then(allowanceList => {
    res.json(allowanceList);
  });
});

// RUTA PARA BUSCAR EL ALLOWANCE ACTIVO (CONSULTADO)
Router.get("/findActive/:id", function(req, res) {
  AllowanceDetail.findOne({
    attributes: [
      "amount",
      "observation",
      "employeeAmount",
      "limitAmount",
      "paymentDate",
      "status",
      "receiptPath",
      "adminComment",
      "id"
    ],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Allowance,
        as: "allowanceDetail",
        attributes: ["name"]
      },
      {
        model: Employee,
        as: "employeeDetail",
        attributes: ["name", "id"]
      }
    ]
  }).then(allowanceList => {
    res.send(allowanceList);
  });
});

// RUTA PARA ELIMINAR EL ALLOWANCE ACTIVO (CONSULTADO)
Router.delete("/:id/delete", function(req, res) {
  AllowanceDetail.destroy({
    where: {
      id: req.params.id
    }
  }).then(resp => {
    res.sendStatus(204);
  });
});

// RUTA PARA MODIFICAR EL ESTADO EL ALLOWANCE
Router.put("/:id/edit", function(req, res) {
  AllowanceDetail.update(
    {
      status: req.body.status,
      adminComment: req.body.observation
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(resp => {
    res.sendStatus(201);
  });
});

// COUNT CANTIDAD DE ALLOWANCE PENDIENTES DE APROBACION
Router.get("/count", function(req, res) {
  AllowanceDetail.findAll({
    attributes: [],
    where: {
      status: "pending"
    },
    include: [
      {
        model: Employee,
        as: "employeeDetail",
        attributes: [],
        where: {
          id: { [Op.ne]: req.query.userId }
        }
      }
    ]
  }).then(data => {
    res.json(data.length);
  });
});

function paymentDateFn(date, limitDate) {
  let valDate = date.getDay() <= limitDate ? 1 : 2;
  return new Date(date.getFullYear(), date.getMonth() + valDate, 1);
}

Router.post("/emailConfirm", function(req, res) {
  var transporter = nodemailer.createTransport({
    //OBJETO TRANSPORTER DISPARA ENVIO DE MAIL
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL //SSL (Secure Socket Layer) protocolo de seguridad
    auth: {
      user: "automaticEmailConfirm@gmail.com", //
      pass: "bootcamp2019" //
    }
  });

  var mailOptions = {
    from: "automaticEmailConfirm@gmail.com", //DATOS DEL MAIL QUE RECIVE
    to: "admProjectPlataforma5@gmail.com", // DATOS DEL MAIL QUE RECIVE
    subject: `You have received a new allowance requirement, pre-authorisation is required.
       `,
    html: `
    <img
    src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/MetaDataImages/preview-image.ashx"
    alt="Endava" width = 200px />
      <p style= "font-size:18px">
      You have received a new allowance requirement, pre-authorisation is required.
      For further information, consult the section Admin Panel.  
      </p>

          <h3> Details:</h3>
          <ul style= "font-size:16px">
              <li>
              UserName: ${req.body.userData.name}
              </li>
              <li>
              AllowanceName:  ${req.body.allowanceName}
              </li>
            
          </ul>
          <h3>  Please, follow this link http://40.117.118.106:3000/ to authorize </h3>
      `
  };
  console.log("sending email", mailOptions);
  transporter.sendMail(mailOptions, function(error, info) {
    console.log("senMail returned!");
    if (error) {
      //ATAJA POSIBLES ERRORES
      console.log("ERROR!!!!!!", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = Router;
