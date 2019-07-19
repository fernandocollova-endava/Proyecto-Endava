const Allowance = require("./db/models").Allowance
const Employee = require("./db/models").Employee
const Technologies = require ("./db/models").Technologies

Employee.create(
    
    {
    name: 'Maria',
    surname: 'Gonzalez',
    avatar: "img",
    email: 'm.gonzalez@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Juan',
    surname: 'Perez',
    avatar: "img",
    email: 'j.perez@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create(
    {
    name: 'Agustin',
    surname: 'Pardo',
    avatar: "img",
    email: 'agustin.pardo@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Lucas',
    surname: 'Aguirre',
    avatar: "img",
    email: 'l.aguirre@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Sebastian',
    surname: 'Kjolhede',
    avatar: "img",
    email: 's.kol@endava.com',
    sector: 'front',
    "isAdmin": false,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Alejandro',
    surname: 'Villa',
    avatar: "img",
    email: 'a.villa@endava.com',
    sector: 'backend',
    "isAdmin": false,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})


Allowance.create({
    name: 'gym',
    limitDay: 15,
    fixedAmount: 800,
    imgUrl:'https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ServicesInnerPages/Smart-Automation/Smart-Automation-Whitepaper/AutomationWP_V2_Hero_Mobile_480x500.ashx',
    completeName:'Gym Allowance',
    active:true
    
})
Allowance.create({
    name: 'training',
    limitDay: 15,
    fixedAmount: 10000,
    imgUrl:'https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx',
    completeName:'Training Allowance',
    active:true
})
Allowance.create({
    name: 'child-care',
    limitDay: 15,
    fixedAmount: 800,
    imgUrl:'https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/05_MeetEndava_480x500.ashx',
    completeName:'Child Care Allowance',
    active:true
})
Allowance.create({
    name: 'book',
    limitDay: 15,
    fixedAmount: 800,
    imgUrl:'https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ImagesWithOurPeople/Desktop/Inner_650x650_47.ashx',
    completeName:'Book Allowance',
    active:true
})
Allowance.create({
    name: 'borrador',
    limitDay: 15,
    fixedAmount: 800,
    imgUrl:'https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ServicesInnerPages/Smart-Automation/Smart-Automation-Whitepaper/AutomationWP_V2_Hero_Mobile_480x500.ashx',
    completeName:'Gym Allowance',
    active:false
})


Technologies.create({
    name: 'Javascript',
    imagen:"javascript.png"
})

Technologies.create({
    name: 'Javascript',
    imagen:"javascript.png"
})