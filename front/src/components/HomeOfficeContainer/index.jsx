import React from "react";
import Calendar from "./Calendar";
import { openCloseNavBar } from "../../redux/actions/navbar"
import {
  fetchHomeOffice, addHomeOffice, deleteHomeOffice,
  fetchHomeOfficeProyect, fetchHomeOfAllowanceProyect, fetchHomeOfBirthDay
} from "../../redux/actions/homeOffice"
import { connect } from "react-redux";


class HomeOfficeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      buildRows: [],
      currentMonth: 0, // Mes seleccionado actual
      currentYear: 0, // Año seleccionado actual
      currentProyect: '', // Proyecto seleccionado Actual
      proyectList: [], // Lista de proyectos actual
      employeProyectList: [], // Lista de los empleados que componen el proyecto seleccionado
    };
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.handleAddHome = this.handleAddHome.bind(this)
    this.handleProyect = this.handleProyect.bind(this)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.openCloseNavBar(false)

    // POSICIONA AL CALENDARIO A LA FECHA ACTUAL
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    // Carga los eventos del mes y año enviado
    this.props.fetchHomeOffice(currentYear, currentMonth, this.props.proyectUser)
    this.setState({ currentProyect: this.props.proyectUser }) // Setea el estado default de Proyecto al del usuario activo
    this.setStateLocal(currentMonth, currentYear)

    // Consulta el listado de empleados que componen el proyecto
    this.props.fetchHomeOfAllowanceProyect(this.props.proyectUser)
      .then(employeList => {
        // Setea localmente la lista
        this.setState({ employeProyectList: employeList.data })
      })

    // Carga el listado de proyectos actuales
    this.props.fetchHomeOfficeProyect()
      .then(proyectList => {
        // Setea localmente la lista
        this.setState({ proyectList: proyectList.data })
      })

    // Carga los cumpleaños actuales
    this.props.fetchHomeOfBirthDay(currentMonth)
  }
  // AVANZA UN MES
  next() {
    let currentYear = (this.state.currentMonth === 11) ? this.state.currentYear + 1 : this.state.currentYear;
    let currentMonth = (this.state.currentMonth === 11) ? Number(0) : (this.state.currentMonth + 1);
    this.props.fetchHomeOffice(currentYear, currentMonth, this.state.currentProyect)
    this.setStateLocal(currentMonth, currentYear)
  }
  // RETROCEDE UN MES
  previous() {
    let currentYear = (this.state.currentMonth === 0) ? this.state.currentYear - 1 : this.state.currentYear;
    let currentMonth = (this.state.currentMonth === 0) ? 11 : this.state.currentMonth - 1;
    this.props.fetchHomeOffice(currentYear, currentMonth, this.state.currentProyect)
    this.setStateLocal(currentMonth, currentYear)
  }
  // MUESTRA EL MES SELECCIONADO
  changeMonth(e) {
    this.setState({ currentMonth: Number(e.target.value) }, () => {
      this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, this.state.currentProyect)
    })
    // Carga los cumpleaños actuales
    this.props.fetchHomeOfBirthDay(Number(e.target.value))
  }
  // MUESTRA EL AÑO SELECCIONADO
  changeYear(e) {
    this.setState({ currentYear: e.target.value }, () => {
      this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, this.state.currentProyect)
    })
  }

  // ONCHANGE PARA SELECCIONAR EL PROYECTO ACTUAL
  handleProyect(e) {
    this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, e.target.value) // Reenderiza calendario
    // Setea el nuevo nombre de proyecto
    this.setState({ currentProyect: e.target.value })

    this.props.fetchHomeOfAllowanceProyect(e.target.value)
      .then(employeList => {
        // Setea localmente la lista
        this.setState({ employeProyectList: employeList.data })
      })
  }
  //FUNCION PARA AGREGAR UN NUEVO HOME OFFICE
  handleAddHome(day) {
    // Setea el mes y dia a dos digitos
    let month = ((Number(this.state.currentMonth) + 1) < 10) ? '0' + (Number(this.state.currentMonth) + 1) : (Number(this.state.currentMonth) + 1);
    let newDay = (day <= 9) ? '0' + day : day; // Construye el dia
    let buildDate = `${this.state.currentYear}-${month}-${newDay}` // Construye la fecha
    let idUser = this.props.idUser // Guarda el id del usuario

    // Consulta si ya agrego un evento, si lo agregó lo elimina. sino lo ingresa
    function search(data) {
      return data.date === buildDate && data.employeeHomeOffice.id == idUser;
    }
    let list = this.props.listHomeOffice // Lista de eventos actual

    if (this.state.currentProyect !== this.props.proyectUser) return // Si el nombre del proyecto no es el del empleado, no le permitira ingresar / borrar el evento
    if (list.find(search)) {
      // si existe se elimina
      this.props.deleteHomeOffice(idUser, buildDate)
        .then(() => {
          this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, this.state.currentProyect)
        })
    } else {
      // si no existe, se crea
      this.props.addHomeOffice(idUser, buildDate)
        .then(() => {
          this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, this.state.currentProyect)
        })
    }

  }
  // FUNCION REUTILIZADA PARA SETEAR LOS ESTADOS (NEXT, PREV, JUMP, CURRENT)
  setStateLocal(currentMonth, currentYear) {
    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    })
    // Carga los cumpleaños actuales
    this.props.fetchHomeOfBirthDay(currentMonth)
  }

  render() {
    return (
      <Calendar
        buildRows={this.state.buildRows}
        currentMonth={this.state.currentMonth} // Visualiza el mes seleccionado
        currentYear={this.state.currentYear} // Visualiza el año seleccionado
        next={this.next} // Controla el mes siguiente
        previous={this.previous} // Controla el mes anterior
        changeYear={this.changeYear} // Modifica el año
        changeMonth={this.changeMonth} // Modifica el mes
        handleAddHome={this.handleAddHome} // Agrega el home office en la fecha seleccionada
        listHomeOffice={this.props.listHomeOffice} // Lista de home office ya cargados
        handleProyect={this.handleProyect} // Modifica los proyectos
        proyectList={this.state.proyectList} // Lista los proyectos
        currentProyect={this.state.currentProyect} // Visualiza el proyecto actual
        employeProyectList={this.state.employeProyectList} // Lista de los empleados que componen el proyecto seleccionado
        birthDayList={this.props.birthDayList} // Lista de cumpleaños del mes
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    idUser: state.user.user.id, // Extrae el id del usuario conectado.
    proyectUser: state.user.user.proyect, // Extrae el id del usuario conectado.
    listHomeOffice: state.homeOf.list, // Extrae - Consulta los home-office del mes y año enviado
    birthDayList: state.homeOf.birtDayList
  }
}
const mapDispatchToProps = dispatch => ({
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
  // Agrega un nuevo home office a la bd
  addHomeOffice: (idUser, date) => dispatch(addHomeOffice(idUser, date)),
  // Consulta a la base de datos los eventos del mes y año
  fetchHomeOffice: (year, month, proyect) => dispatch(fetchHomeOffice(year, month, proyect)),
  // Elimina un evento cargado
  deleteHomeOffice: (idUser, date) => dispatch(deleteHomeOffice(idUser, date)),
  // Consulta el listado de proyectos actuales
  fetchHomeOfficeProyect: () => dispatch(fetchHomeOfficeProyect()),
  // Consulta los integrantes del proyecto
  fetchHomeOfAllowanceProyect: (proyect) => dispatch(fetchHomeOfAllowanceProyect(proyect)),
  // Consulta los cumpleaños del mes
  fetchHomeOfBirthDay: (month) => dispatch(fetchHomeOfBirthDay(month))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeOfficeContainer);
