const Employee = require("./employee");
const db = require('../index');
const {
  StaticAllowance,
  EmployeeAllowence,
  AllowanceStatus
} = require("./StaticAllowance");

// Relación Static - Employee ( Child care, Course, Gym )
Employee.belongsToMany(StaticAllowance, {
  as: "allowance",
  through: EmployeeAllowence,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
StaticAllowance.belongsToMany(Employee, {
  as: "employee",
  through: EmployeeAllowence,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Relación BookAllowance - Employe ( Prorrateo; Fecha; Monto ingresado, otorgado, remanente.)
// Employee.belongsToMany(StaticAllowance, { as: "allowance", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
// StaticAllowance.belongsToMany(Employee, { as: "employee", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = {
  Employee,
  StaticAllowance,
  db
};
