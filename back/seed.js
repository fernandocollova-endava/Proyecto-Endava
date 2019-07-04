const Allowance = require("./db/models").StaticAllowance
const Employee = require("./db/models").Employee

Employee.create({
    name: 'Agustin',
    surname: 'Pardo',
    email: 'agustin.pardo@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    salt: 'lkjljasda'
})
Employee.create({
    name: 'Lucas',
    surname: 'Aguirre',
    email: 'lucas.aguirre@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    salt: 'lkjljasda'
})
Employee.create({
    name: 'Sebastian',
    surname: 'Kjolhede',
    email: 'sebastian.kjolhede@endava.com',
    sector: 'front',
    "isAdmin": false,
    password: '123',
    salt: 'lkjljasda'
})
Employee.create({
    name: 'Alejandro',
    surname: 'Villareal',
    email: 'alejandro.villareal@endava.com',
    sector: 'backend',
    "isAdmin": false,
    password: '123',
    salt: 'lkjljasda'
})



Allowance.create({
    name: 'Gym Allowance',
    observation: 'Se envia comprobante adjunto',
    fixedAmount: 800
})
Allowance.create({
    name: 'Course Allowance',
    observation: 'Se envia comprobante adjunto',
    fixedAmount: 10000
})
Allowance.create({
    name: 'Child care Allowance',
    observation: 'Se envia comprobante adjunto',
    fixedAmount: 800
})
