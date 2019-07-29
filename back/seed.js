const Allowance = require("./db/models").Allowance;
const Employee = require("./db/models").Employee;
const Technologies = require("./db/models").Technologies;
const DisciplineEvent = require("./db/models").DisciplineEvent;

Employee.create(
    
    {
    name: 'Nadia',
    surname: 'Barrosoda Costa',
    email: 'nadia.barrosodacosta@endava.com',
    sector: 'Quality Assurance',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthdayDate: '2019-07-20',
    proyect:'Project name 1'
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
    birthdayDate: '2019-08-06',
    proyect:'Project name 1'
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
    birthdayDate: '2019-08-14',
    proyect:'Project name 1'
})
Employee.create({
    name: 'Lucas',
    surname: 'Aguirre',
    email: 'lucas.aguirre@endava.com',
    sector: 'FullStack',
    "isAdmin": true,
    password: '123',
    passwordChanged: false,
    birthdayDate: '2019-09-01',
    proyect:'Project name 1'
})
Employee.create({
    name: 'Adrian',
    surname: 'Gay Cattaneo',
    email: 'adrian.gaycattaneo@endava.com',
    sector: 'Team Leader-Sr Developer',
    "isAdmin": true,
    password: '1234',
    passwordChanged: false,
    birthdayDate: '2019-07-05',
    proyect:'Project name 1'
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
    birthdayDate: '2019-03-20',
    proyect:'Project name 2'
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
    birthdayDate: '2019-07-20',
    proyect:'Project name 2'
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
    birthdayDate: '2019-09-20',
    proyect:'Project name 2'
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
    birthdayDate: '2019-07-20',
    proyect:'Project name 3'
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
    birthdayDate: '2019-07-20',
    proyect:'Project name 3'
    //salt: 'lkjljasda'
})


Allowance.create({
  name: "gym",
  limitDay: 15,
  fixedAmount: 800,
  imgUrl:
    "https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ServicesInnerPages/Smart-Automation/Smart-Automation-Whitepaper/AutomationWP_V2_Hero_Mobile_480x500.ashx",
  completeName: "Gym Allowance",
  active: true
});
Allowance.create({
  name: "training",
  limitDay: 15,
  fixedAmount: 10000,
  imgUrl:
    "https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx",
  completeName: "Training Allowance",
  active: true
});
Allowance.create({
  name: "child-care",
  limitDay: 15,
  fixedAmount: 800,
  imgUrl:
    "https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/05_MeetEndava_480x500.ashx",
  completeName: "Child Care Allowance",
  active: true
});
Allowance.create({
  name: "book",
  limitDay: 15,
  fixedAmount: 800,
  imgUrl:
    "https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ImagesWithOurPeople/Desktop/Inner_650x650_47.ashx",
  completeName: "Book Allowance",
  active: true
});
Allowance.create({
  name: "borrador",
  limitDay: 15,
  fixedAmount: 800,
  imgUrl:
    "https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ServicesInnerPages/Smart-Automation/Smart-Automation-Whitepaper/AutomationWP_V2_Hero_Mobile_480x500.ashx",
  completeName: "Gym Allowance",
  active: false
});

Technologies.create({
  name: "Javascript",
  image: "javascript.png"
});
Technologies.create({
  name: "Node Js",
  image: "nodejs.png"
});
Technologies.create({
  name: "HTML 5",
  image: "html.png"
});
Technologies.create({
  name: "CSS 3",
  image: "css3.png"
});
Technologies.create({
  name: "Bootstrap",
  image: "bootstrap.png"
});
Technologies.create({
  name: "Angular",
  image: "angular.png"
});
Technologies.create({
  name: "Vue",
  imagen: "vue.png"
});
Technologies.create({
  name: "React",
  image: "react.png"
});
Technologies.create({
  name: "Java",
  image: "java.png"
});
Technologies.create({
  name: "PHP",
  imagen: "php.png"
});
Technologies.create({
  name: "Coworking",
  image: "coworking.png"
});
Technologies.create({
  name: "JQuery",
  image: "jquery.png"
});
Technologies.create({
  name: "MySql",
  image: "mysql.png"
});
Technologies.create({
  name: "Python",
  image: "python.jpg"
});
Technologies.create({
  name: "Sass",
  image: "sass.png"
});
Technologies.create({
  name: "Scrum",
  image: "Scrum.png"
});
Technologies.create({
  name: "Mongodb",
  image: "mongodb.png"
});
Technologies.create({
  name: "Scrum",
  image: "Scrum.png"
});
///
DisciplineEvent.create({
  topic: "Java",
  date: "2019-09-06",
  time: "10:30",
  description:
    "Aprende a construir aplicaciones con Java y domina por completo una de las tecnologías más utilizadas del mercado. Aprendé a desarrollar poderosas aplicaciones Orientadas a Objetos con integración con Base de Datos y en cualquier sistema opera",
  status: "pending",
  technologieId: "9"
});
DisciplineEvent.create({

    topic: "Phyton",
    date: "2019-08-06",
    time: "11:30",
    description:
      "Te contamos sobre Phyton. Desarrolla tu perfil técnico en Inteligencia artificial. Introdúcete al mundo de Machine Learning.Comprende los desafíos sociales e industriales que plantea la Inteligencia Artificial que ya está entre nosotros. Únete a la revolución de la Inteligencia Artificial.",
    status: "pending",
    technologieId: "14"
});
DisciplineEvent.create({

    topic: "Mysql",
    date: "2019-08-03",
    time: "11:30",
    description:
      "Conoce el mundo de las bases de datos para entender cómo trabajan, cómo se instalan, y las diferencias entre las distintas marcas (SQL Server, MySQL, Oracle, etc.) Aprende el lenguaje de consultas SQL, fundamental para el manejo y manipulación de datos.",
    status: "pending",
    technologieId: "13"
});
DisciplineEvent.create({

    topic: "React",
    date: "2019-08-15",
    time: "09:30",
    description:
      "Explota al máximo las capacidades que React nos ofrece. Profesionaliza tus desarrollos incorporando los patrones de diseño predominantes en la industria. Evoluciona Redux incorporando acciones asincrónicas.",
    status: "pending",
    technologieId: "8"
});
DisciplineEvent.create({

    topic: "Angular",
    date: "2019-08-20",
    time: "11:30",
    description:
      "Construya rápidamente con plantillas simples y declarativas. Extienda el lenguaje de los templates con sus propios componentes y use una amplia gama de componentes existentes creando aplicaciones asombrosas trabajando con uno de los mejores Frameworks de Javascript",
    status: "pending",
    technologieId: "6"
});


