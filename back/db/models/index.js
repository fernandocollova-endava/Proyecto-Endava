const db = require("../index");
const Employee = require("./employee");
const Technologies = require ("./technologies") 
const DisciplineEvent = require("./disciplineEvent");
const {
  Allowance, // Tabla de reintegros
  AllowanceDetail, // Tabla de detalles ( relacionados a empleados )
} = require("./StaticAllowance");

// Relación Static - Employee ( Child care, Course, Gym )
AllowanceDetail.belongsTo(Allowance, { as: "allowanceDetail" })
AllowanceDetail.belongsTo(Employee, { as: "employeeDetail" })

Employee.belongsToMany(DisciplineEvent, {
  through: "employee-discipline",
  as: "disciplineEvent"
});
DisciplineEvent.belongsToMany(Employee, {
  through: "employee-discipline",
  as: "employee"
});

module.exports = {
  Employee,
  Allowance,
  AllowanceDetail,
  DisciplineEvent,
  Technologies,
  db
};
