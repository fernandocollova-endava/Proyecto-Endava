const db = require('../index');

const Employee = require("./employee");
const {
  Allowance, // Tabla de reintegros
  AllowanceDetail, // Tabla de detalles ( relacionados a empleados )
} = require("./StaticAllowance");

// Relación Tabla detalle ( Child care, Course, Gym )
AllowanceDetail.belongsTo(Allowance, { as: "allowanceDetail" })
AllowanceDetail.belongsTo(Employee, { as: "employeeDetail" })


module.exports = {
  Employee,
  Allowance,
  AllowanceDetail,
  db
};
