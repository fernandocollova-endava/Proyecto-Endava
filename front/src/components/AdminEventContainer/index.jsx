import React from "react";
import { connect } from "react-redux";
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
    this.handleFilterStatus = this.handleFilterStatus.bind(this);
    this.handleSaveConfirm = this.handleSaveConfirm.bind(this);
  }

  componentDidMount() {
    this.props.openCloseNavBar(false);
    this.props.fetchDisciplineEvents(this.props.user.id, this.props.adminPath, this.state.allowanceStatus);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.adminPath !== this.props.adminPath) {
      this.props.fetchDisciplineEvents(this.props.user.id, this.props.adminPath, this.state.allowanceStatus)
    }
  }

  // FUNCION DE CONSULTA HISTORIAL / DETALLE
  viewDetails(id) {
    this.props.fetchActiveEvent(id).then(data => {
    
        this.setState({
          modal: true
        
      });
    });
  }
  handleFilterStatus(e) {
    this.props.fetchDisciplineEvents(this.props.user.id,this.props.adminPath, e.target.value);
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

  
  handleSaveConfirm(e) {
    e.preventDefault();
  
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
       
        this.props.fetchDisciplineEvents(this.props.user.id,this.props.adminPath, this.state.allowanceStatus);
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
    deleteEvent: id => dispatch(deleteEvent(id)), // Elimina detalle
    editEventStatus: (id, status, observation) => dispatch(editEventStatus(id, status, observation)), // Switch State
    fetchCountPending: userId => dispatch(fetchCountPending(userId)), // Consulta cantidad de allowance pendientes
    fetchDisciplineEvents: (userId, adminUrl, status) => dispatch(fetchDisciplineEvents(userId, adminUrl, status)),
  };
};
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AdminEventContainer);