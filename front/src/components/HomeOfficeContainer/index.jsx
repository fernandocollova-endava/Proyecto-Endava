import React from "react";
import Calendar from "./Calendar";
import { openCloseNavBar } from "../../redux/actions/navbar"
import { fetchHomeOffice, addHomeOffice } from "../../redux/actions/homeOffice"
import { connect } from "react-redux";


class HomeOfficeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      buildRows: [],
      currentMonth: 0,
      currentYear: 0, 
      currentProyect:''
    };
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.jump = this.jump.bind(this)
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
    this.setStateLocal(currentMonth, currentYear)

  }
  // AVANZA UN MES
  next() {
    let currentYear = (this.state.currentMonth === 11) ? this.state.currentYear + 1 : this.state.currentYear;
    let currentMonth = (this.state.currentMonth + 1) % 12;
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
  // MUESTRA EL MES / AÑO SELECCIONADO
  jump() {
    let currentYear = parseInt(selectYear.value);
    let currentMonth = parseInt(selectMonth.value);
  }
  // ONCHANGE PARA SELECCIONAR EL PROYECTO ACTUAL
  handleProyect(e) {
    this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, e.target.value) // Reenderiza calendario
    this.setState({
      currentProyect:e.target.value // Setea el nuevo nombre de proyecto
    })
  }
  //FUNCION PARA AGREGAR UN NUEVO HOME OFFICE
  handleAddHome(day) {
    // Setea el mes y dia a dos digitos
    let month = ((Number(this.state.currentMonth) + 1) < 10) ? '0' + (Number(this.state.currentMonth) + 1) : (Number(this.state.currentMonth) + 1);
    let newDay = (day <= 9) ? '0' + day : day;
    // Construye la fecha
    let buildDate = `${this.state.currentYear}-${month}-${newDay}`
    this.props.addHomeOffice(this.props.idUser, buildDate)
      .then(()=>{
        this.props.fetchHomeOffice(this.state.currentYear, this.state.currentMonth, this.state.currentProyect)
      })
  }
  // FUNCION REUTILIZADA PARA SETEAR LOS ESTADOS (NEXT, PREV, JUMP, CURRENT)
  setStateLocal(currentMonth, currentYear) {
    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    })
  }

  render() {
    return (
      <Calendar
        buildRows={this.state.buildRows}
        next={this.next}
        currentMonth={this.state.currentMonth}
        currentYear={this.state.currentYear}
        previous={this.previous}
        jump={this.jump}
        handleAddHome={this.handleAddHome}
        listHomeOffice={this.props.listHomeOffice}
        handleProyect = {this.handleProyect}
      />
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.homeOf)
  return {
    idUser: state.user.user.id, // Extrae el id del usuario conectado.
    proyectUser: state.user.user.proyect, // Extrae el id del usuario conectado.
    listHomeOffice: state.homeOf.list // Extrae - Consulta los home-office del mes y año enviado
  }
}
const mapDispatchToProps = dispatch => ({
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
  // Agrega un nuevo home office a la bd
  addHomeOffice: (idUser, date) => dispatch(addHomeOffice(idUser, date)),
  // Consulta a la base de datos los eventos del mes y año
  fetchHomeOffice: (year, month, proyect) => dispatch(fetchHomeOffice(year, month, proyect))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeOfficeContainer);
