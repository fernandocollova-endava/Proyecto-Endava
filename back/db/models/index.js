const db = require('../index');

const Employee = require("./employee");
const {
  Allowance, // Tabla de reintegros
  AllowanceDetail, // Tabla de detalles ( relacionados a empleados many-to-many)
  Employee_Allowance // Tabla de relación ( Empleado vs Reintegros)
} = require("./StaticAllowance");

// Relación Static - Employee ( Child care, Course, Gym )
Employee.belongsToMany(Allowance, {
  as: "allowance",
  through: Employee_Allowance,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Allowance.belongsToMany(Employee, {
  as: "employee",
  through: Employee_Allowance,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//AllowanceDetail.belongsToMany(EmployeeAllowence, {as: "emPall",through: 'detailAllowance'})
AllowanceDetail.belongsTo(Employee_Allowance, { as: "employeeAllowance" })
AllowanceDetail.belongsTo(Allowance, { as: "allowanceDetail" })
AllowanceDetail.belongsTo(Employee, { as: "employeeDetail" })


module.exports = {
  Employee,
  Allowance,
  Employee_Allowance,
  AllowanceDetail,
  db
};
