const Allowance = require("./db/models").Allowance
const Employee = require("./db/models").Employee
const Technologies = require ("./db/models").Technologies

Employee.create(
    
    {
    name: 'Maria',
    surname: 'Gonzalez',
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
    name: 'Node Js',
    imagen:"nodejs.png"
})
Technologies.create({
    name: 'HTML 5',
    imagen:"html.png"
})
Technologies.create({
    name: 'CSS 3',
    imagen:"css3.png"
})
Technologies.create({
    name: 'Bootstrap',
    imagen:"bootstrap.png"
})
Technologies.create({
    name: 'Angular',
    imagen:"angular.png"
})
Technologies.create({
    name: 'Vue',
    imagen:"vue.png"
})
Technologies.create({
    name: 'React',
    imagen:"react.png"
})
Technologies.create({
    name: 'Java',
    imagen:"java.png"
})
Technologies.create({
    name: 'PHP',
    imagen:"php.png"
})
Technologies.create({
    name: 'Coworking',
    imagen:"coworking.png"
})
Technologies.create({
    name: 'JQuery',
    imagen:"jquery.png"
})
Technologies.create({
    name: 'MySql',
    imagen:"mysql.png"
})
Technologies.create({
    name: 'Python',
    imagen:"python.jpg"
})
Technologies.create({
    name: 'Sass',
    imagen:"sass.png"
})
Technologies.create({
    name: 'Scrum',
    imagen:"Scrum.png"
})
Technologies.create({
    name: 'Mongodb',
    imagen:"mongodb.png"
})
Technologies.create({
    name: 'Scrum',
    imagen:"Scrum.png"
})

