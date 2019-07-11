const Allowance = require("./db/models").Allowance
const Employee = require("./db/models").Employee

Employee.create({
    name: 'Agustin',
    surname: 'Pardo',
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
    email: 'lucas.aguirre@endava.com',
    sector: 'fullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Sebastian',
    surname: 'Kjolhede',
    email: 'sebastian.kjolhede@endava.com',
    sector: 'front',
    "isAdmin": false,
    password: '123',
    passwordChanged: false
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'juan',
    surname: 'Villareal',
    email: 'ale@endava.com',
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