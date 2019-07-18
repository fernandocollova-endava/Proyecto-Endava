const db = require("../index");

const Employee = require("./employee");
const DisciplineEvent = require("./disciplineEvent");
const {
  Allowance, // Tabla de reintegros
  AllowanceDetail, // Tabla de detalles ( relacionados a empleados )
} = require("./StaticAllowance");

// Relación Static - Employee ( Child care, Course, Gym )

Employee.belongsToMany(DisciplineEvent, {
  through: "employee-discipline",
  as: "disciplineEvent"
});
DisciplineEvent.belongsToMany(Employee, {
  through: "employee-discipline",
  as: "employee"
});
AllowanceDetail.belongsTo(Allowance, { as: "allowanceDetail" })
AllowanceDetail.belongsTo(Employee, { as: "employeeDetail" })


module.exports = {
  Employee,
  Allowance,
  AllowanceDetail,
  DisciplineEvent,
  db
};
