const Employee = require('./employee')
const {StaticAllowance, EmployeeAllowence} = require('./StaticAllowance')


// Relación Static - Employee ( Children, Course, Gym )
Employee.belongsToMany(StaticAllowance, { as: "allowance", through: EmployeeAllowence, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
StaticAllowance.belongsToMany(Employee, { as: "employee", through: EmployeeAllowence, onDelete: 'CASCADE', onUpdate: 'CASCADE' })

// Relación BookAllowance - Employe ( Prorrateo; Fecha; Monto ingresado, otorgado, remanente.)
// Employee.belongsToMany(StaticAllowance, { as: "allowance", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
// StaticAllowance.belongsToMany(Employee, { as: "employee", through: 'EmployeeAllowence', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = {
    Employee,
    StaticAllowance
}

