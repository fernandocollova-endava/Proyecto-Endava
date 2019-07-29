const db = require("../index");
const Employee = require("./employee");
const HomeOffice = require("./homeOffice");
const DisciplineEvent = require("./disciplineEvent");
const Technologies = require('./technologies'); // Tabla de opciones para los eventos
const {
  Allowance, // Tabla de reintegros
  AllowanceDetail, // Tabla de detalles ( relacionados a empleados )
} = require("./StaticAllowance");

// Relación Static - Employee ( Child care, Course, Gym )
AllowanceDetail.belongsTo(Allowance, { as: "allowanceDetail" })
AllowanceDetail.belongsTo(Employee, { as: "employeeDetail" })

// Employee.belongsTo(DisciplineEvent, {
//   as: "disciplineEvent"
// });
DisciplineEvent.belongsTo(Employee, {
  as: "employee"
});
DisciplineEvent.belongsTo(Technologies, {as: "technologie"})

// Relacion de HomeOffice a empleados
HomeOffice.belongsTo(Employee, { as: "employeeHomeOffice" })

module.exports = {
  Employee,
  Allowance,
  AllowanceDetail,
  DisciplineEvent,
  Technologies,
  HomeOffice,
  db
};
