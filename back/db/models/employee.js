const Sequelize = require("sequelize");
const db = require("../index");

const crypto = require("crypto");

const Employee = db.define("employee", {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    unique: true
  },
  avatar:{
    type: Sequelize.TEXT,
    defaultValue:"avatarDefault.jpg"
},
  sector: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  passwordChanged: {
    type: Sequelize.BOOLEAN
  },
  salt: {
    type: Sequelize.STRING
  },
  birthdayDate:{
    type: Sequelize.STRING,
  }

});

Employee.generateSalt = function() {
  return crypto.randomBytes(20).toString("hex");
};

Employee.prototype.encryptPassword = function(password) {
  return crypto
    .createHmac("sha1", this.salt)
    .update(password)
    .digest("hex");
};
Employee.prototype.validatePassword = function(password) {
  const hash = crypto
    .createHmac("sha1", this.salt)
    .update(password)
    .digest("hex");

  return this.password === hash;
};
Employee.prototype.updatePassword = function(password) { //creo un nuevo meodo de instancia, para el empleado que esto queriendo actualizar
  var newPass = crypto
    .createHmac("sha1", this.salt)
    .update(password)
    .digest("hex");
  Employee.update(
    { password: newPass, passwordChanged: true }, // el update lo realizo aca, no en la ruta. 
    { where: { id: this.id } }                  //
  )
  return 'ok'
};


Employee.addHook("beforeCreate", employee => {
  employee.salt = Employee.generateSalt();
  employee.password = employee.encryptPassword(employee.password);
});

module.exports = Employee;
