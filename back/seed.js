const Allowance = require("./db/models").Allowance
const Employee = require("./db/models").Employee
const Technologies = require ("./db/models").Technologies

Employee.create(
    
    {
    name: 'Nadia',
    surname: 'Barrosoda Costa',
    email: 'nadia.barrosodacosta@endava.com',
    sector: 'Quality Assurance',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-07-20',
    proyect:'Proyect name 1'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Nicolas',
    surname: 'Endava',
    email: 'nicolas@endava.com',
    sector: 'UX UI Designer',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-08-06',
    proyect:'Proyect name 1'
    //salt: 'lkjljasda'
})
Employee.create(
    {
    name: 'Agustin',
    surname: 'Pardo',
    email: 'agustin.pardo@endava.com',
    sector: 'FullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false,
    birthDate: '2019-08-14',
    proyect:'Proyect name 1'
})
Employee.create({
    name: 'Lucas',
    surname: 'Aguirre',
    email: 'lucas.aguirre@endava.com',
    sector: 'FullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false,
    birthDate: '2019-09-01',
    proyect:'Proyect name 1'
})
Employee.create({
    name: 'Adrian',
    surname: 'Gay Cattaneo',
    email: 'adrian.gaycattaneo@endava.com',
    sector: 'Team Leader-Sr Developer',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-07-05',
    proyect:'Proyect name 1'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Jose',
    surname: 'Zambrano',
    email: 'jose.zambrano@endava.com',
    sector: 'Scrum Master',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-03-20',
    proyect:'Proyect name 2'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Analia',
    surname: 'Endava',
    email: 'analia@endava.com',
    sector: 'Quality Assurance',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-07-20',
    proyect:'Proyect name 2'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Andrea',
    surname: 'Endava',
    email: 'andrea@endava.com',
    sector: 'Quality Assurance',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-09-20',
    proyect:'Proyect name 2'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Eliana',
    surname: 'Endava',
    email: 'eliana@endava.com',
    sector: 'Quality Assurance',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthDate: '2019-07-20',
    proyect:'Proyect name 3'
    //salt: 'lkjljasda'
})
Employee.create({
    name: 'Empleado',
    surname: 'Empleado',
    email: 'empleado@endava.com',
    sector: 'Full Stack',
    "isAdmin": false,
    password: '1234',
    passwordChanged: true,
    birthDate: '2019-07-20',
    proyect:'Proyect name 3'
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

