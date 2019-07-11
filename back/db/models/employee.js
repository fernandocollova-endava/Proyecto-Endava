const Sequelize = require ("sequelize");
const db  = require ("../index")

const crypto = require('crypto');

const Employee = db.define("employee",{

    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    surname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        unique: true
    },
    sector:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    isAdmin: {
        type: Sequelize.BOOLEAN,
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    passwordChanged: {
        type: Sequelize.BOOLEAN,
    },
    salt: {
        type: Sequelize.STRING,
    }
})

Employee.generateSalt = function() {
    return crypto.randomBytes(20).toString('hex')
}

Employee.prototype.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
};

Employee.prototype.validatePassword = function(password) {
    const hash = crypto.createHmac('sha1', this.salt).update(password).digest('hex')

    return this.password === hash;
};

Employee.addHook('beforeCreate', (employee) => {
    employee.salt = Employee.generateSalt()
    employee.password = employee.encryptPassword(employee.password)
})

module.exports = Employee;
