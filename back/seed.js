const Allowance = require("./db/models").StaticAllowance
const Employee = require("./db/models").Employee

Employee.create({
    name: 'Agustin',
    surname: 'Pardo',
    email: 'agustin.pardo@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Lucas',
    surname: 'Aguirre',
    email: 'lucas.aguirre@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Sebastian',
    surname: 'Kjolhede',
    email: 'sebastian.kjolhede@endava.com',
    sector: 'front',
    "isAdmin": false,
    password: '123',
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'juan',
    surname: 'Villareal',
    email: 'ale@endava.com',
    sector: 'backend',
    "isAdmin": false,
    password: '123',
    //salt: 'lkjljasda'
})


Allowance.create({
    name: 'gym',
    limitDay: 15,
    fixedAmount: 800
})
Allowance.create({
    name: 'trainning',
    limitDay: 15,
    fixedAmount: 10000
})
Allowance.create({
    name: 'child-care',
    limitDay: 15,
    fixedAmount: 800
})
