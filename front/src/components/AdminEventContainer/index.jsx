import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchBookAllowances,
  fetchAllowanceHistory,
  
  
  fetchCountPending,
} from "../../redux/actions/allowanceActions";
import {fetchDisciplineEvents, fetchActiveEvent, editEventStatus, deleteEvent} from "../../redux/actions/disciplineEvents"
import { openCloseNavBar } from "../../redux/actions/navbar";
import ModalEventDetails from "../ModalContainer/ModalEventDetail";
import ModalAviso from "../ModalContainer/modalAviso";
import ModalBoolean from "../ModalContainer/modalBoolean";
import AdminEvent from "../AdminEventContainer/adminEvent";

class AdminEventContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      modalAviso: false,
      modalBoolean: false,
      activeAllowance: {},
      history: [],
      activeItem: "1",
      allowanceType: "",
      titleBoolean: "",
      msjSave: "",
      allowanceStatus: "",
      alertPending: 0,
    };

    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.toggleAviso = this.toggleAviso.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.actionOk = this.actionOk.bind(this);
    this.handleFilterStatus = this.handleFilterStatus.bind(this);
    this.handleSaveConfirm = this.handleSaveConfirm.bind(this);
  }

  componentDidMount() {
    this.props.openCloseNavBar(false);
    this.props.fetchDisciplineEvents(this.props.user.id, this.props.adminPath);
    // this.setState(
    //   {
    //     selectedMonth: selectedMonth
    //   },
    //   () => {
    //     this.props.fetchDisciplineEvents();
       
    //   }
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.adminPath !== this.props.adminPath) {
      this.props.fetchDisciplineEvents(this.props.user.id, this.props.adminPath)
        // .then(() =>
        //   this.props.fetchBookAllowances(
        //     this.props.user.id,
        //     this.props.adminPath
        //   )
        // );
    }
  }

  // FUNCION DE CONSULTA HISTORIAL / DETALLE
  viewDetails(id) {
   
    this.props.fetchActiveEvent(id).then(data => {
      console.log("soy la rta", data)
      let userEventId = data.activeEvent.employeeId; // Retorna el id del usuario del detalle seleccionado
      this.props.fetchDisciplineEvents(userEventId).then(() => {
        
        this.setState({
          modal: true
        });
      });
    });
  }
  handleFilterStatus(e) {
    this.props.fetchDisciplineEvents(this.props.user.id,this.props.user.adminPath);
    this.setState({
      allowanceStatus: e.target.value
    });
  }

  handMonthChange(e) {}
  // TOGGLE MODAL HISTORIAL / DETALLE
  toggleDetails() {
    this.setState({
      modal: !this.state.modal,
      activeItem: "1",
      msjSave: ""
    });
  }

  // TOGGLE MODAL AVISO
  toggleAviso() {
    this.setState({
      modalAviso: !this.state.modalAviso,
      msjSave: ""
    });
  }

  // TOGGLE MODAL BOOLEAN
  toggleBoolean() {
    this.setState({
      modalBoolean: !this.state.modalBoolean
    });
  }

  // TOGGLE PARA NAVEGAR ENTRE EL PANEL DEL MODAL
  togglePanel(id) {
    this.setState({
      activeItem: id
    });
  }

  // FUNCION PARA ELIMINAR UN BENEFICIO ENVIADO ( SOLO SI AUN ESTA PENDIENTE)
  deleteEvent(id) {
    console.log("iddddddddddddddd", id)
    this.setState({
      titleBoolean: "Are you sure you want to delete the information?",
      modalBoolean: true,
      data: {
        id
      }
    });
  }
  // FUNCION PARA EJECUTAR LA ACCION GENERICA DEL MODAL BOOLEAN
  actionOk(data) {
    this.props
      .deleteEvent(data.id)
      .then(() => {
        this.setState({
          modalBoolean: false,
          modalAviso: true,
          textMsj: "The request has been successfully eliminated...",
          titleMsj: "Success"
        });
        this.props.fetchDisciplineEvents(this.props.user.id,this.props.user.adminPath);
      })
      .catch(() => {
        this.setState({
          modalBoolean: false,
          modalAviso: true,
          textMsj: "Ups!, an error occurred while processing the request...",
          titleMsj: "Error"
        });
      });
  }
  
  handleSaveConfirm(e) {
    e.preventDefault();
    console.log(e.target.valie, "soy el value")
    this.props
      .editEventStatus(
        e.target.id.value,
        e.target.status.value,
        e.target.observation.value
      )
      .then(() => {
        this.setState({
          msjSave: "Saved!"
        });
       
        this.props.fetchDisciplineEvents(this.props.user.id,this.props.user.adminPath);
      })
      .catch(() => {
        this.setState({
          msjSave: "Ups!, an error occurred while processing the request..."
        });
      });
  }
  render() {
    return (
      <div>
        {console.log("soy EVENT", this.props.activeEvent)}
        <ModalEventDetails
          modal={this.state.modal}
          toggleDetails={this.toggleDetails}
          togglePanel={this.togglePanel}
          activeItem={this.state.activeItem}
          activeEvent={this.props.activeEvent}
          history={this.props.eventList}
          handleSaveConfirm={this.handleSaveConfirm}
          msjSave={this.state.msjSave}
          allUser={this.props.allUser}
        />
        <ModalAviso
          modal={this.state.modalAviso}
          toggle={this.toggleAviso}
          textMsj={this.state.textMsj}
          titleMsj={this.state.titleMsj}
        />
        <ModalBoolean
          modalBoolean={this.state.modalBoolean}
          toggleBoolean={this.toggleBoolean}
          actionOk={this.actionOk}
          titleBoolean={this.state.titleBoolean}
          data={this.state.data}
        />
        <AdminEvent
          alertPending={this.state.alertPending}
          handleClick={this.handleClick}
          handleFilterStatus={this.handleFilterStatus}
          eventList={this.props.eventList}
          allowanceStatus={this.state.allowanceStatus}
          deleteAllowance={this.props.deleteEvent}
          viewDetails={this.viewDetails}
          urlName={this.props.urlName}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, own) => {
  var urlName = own.match.url.substring(7, 11);

  return {
    urlName: urlName,
    user: state.user.user,
    eventList: state.event.eventList,
    activeEvent: state.event.activeEvent,
    history: state.allowance.historyAllowances, //
    adminPath: own.match.path == "/admin/event", // adminPath => consulta que la ruta corresponda a admin
    currentBookAllowances: state.allowance.currentBookAllowances //busco libros p/mes actual
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchBookAllowances: (user, adminPath) =>dispatch(fetchBookAllowances(user, adminPath)),
    openCloseNavBar: val => dispatch(openCloseNavBar(val)),
    fetchActiveEvent: id => dispatch(fetchActiveEvent(id)),
    fetchAllowanceHistory: (employeeId, allowanceId) => dispatch(fetchAllowanceHistory(employeeId, allowanceId)), //trae la data para el "history del detalle modal"
    deleteEvent: id => dispatch(deleteEvent(id)), // Elimina detalle
    editEventStatus: (id, status, observation) => dispatch(editEventStatus(id, status, observation)), // Switch State
    fetchCountPending: userId => dispatch(fetchCountPending(userId)), // Consulta cantidad de allowance pendientes
    fetchDisciplineEvents: (userId, adminUrl) => dispatch(fetchDisciplineEvents(userId, adminUrl)),
  };
};
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AdminEventContainer);