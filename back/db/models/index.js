const db = require("../index");

const Employee = require("./employee");
const DisciplineEvent = require("./disciplineEvent");
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
Employee.belongsToMany(DisciplineEvent, {
  through: "employee-discipline",
  as: "disciplineEvent"
});
DisciplineEvent.belongsToMany(Employee, {
  through: "employee-discipline",
  as: "employee"
});

//AllowanceDetail.belongsToMany(EmployeeAllowence, {as: "emPall",through: 'detailAllowance'})
AllowanceDetail.belongsTo(Employee_Allowance, { as: "employeeAllowance" });
AllowanceDetail.belongsTo(Allowance, { as: "allowance" });

// Relación BookAllowance - Employe ( Prorrateo; Fecha; Monto ingresado, otorgado, remanente.)
// Employee.belongsToMany(StaticAllowance, { as: "allowance", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
// StaticAllowance.belongsToMany(Employee, { as: "employee", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = {
  Employee,
  Allowance,
  Employee_Allowance,
  AllowanceDetail,
  DisciplineEvent,
  db
};
