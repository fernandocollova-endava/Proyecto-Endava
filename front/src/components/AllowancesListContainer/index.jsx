import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import AllowanceList from "./allowanceList";
import {
  fetchAdminAllowances, fetchAllowances, fetchAllowanceActive, fetchAllowanceHistory,
  deleteAllowance, editStatusAllowance, fetchCountPending
} from "../../redux/actions/allowanceActions"
import { openCloseNavBar } from "../../redux/actions/navbar"
import ModalDetails from '../ModalContainer/modalDetail'
import ModalAviso from '../ModalContainer/modalAviso'
import ModalBoolean from '../ModalContainer/modalBoolean'

class AllowanceListContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      modalAviso: false,
      modalBoolean: false,
      activeAllowance: {},
      history: [],
      activeItem: '1',
      allowanceType: '',
      titleBoolean: '',
      msjSave: '',
      allowanceStatus: '',
      alertPending: 0
    };

    this.toggleDetails = this.toggleDetails.bind(this)
    this.toggleBoolean = this.toggleBoolean.bind(this)
    this.togglePanel = this.togglePanel.bind(this)
    this.viewDetails = this.viewDetails.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleAviso = this.toggleAviso.bind(this)
    this.deleteAllowance = this.deleteAllowance.bind(this)
    this.actionOk = this.actionOk.bind(this)
    this.handleSaveConfirm = this.handleSaveConfirm.bind(this)
    this.handleFilterStatus = this.handleFilterStatus.bind(this)
  }

  componentDidMount() {
    const selectedMonth = moment().month() + 2;
    this.props.fetchAllowances(selectedMonth, this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
    this.props.fetchAdminAllowances()
    this.props.openCloseNavBar(false)
    // Si es admin y si esta en la ruta panel consulta la cantidad.. (Repite abajo)
    if (this.props.user.isAdmin && this.props.allUser) {
      this.props.fetchCountPending(this.props.user.id)
        .then(count => {
          this.setState({ 
            alertPending: count.data }) // Guarda cantidad de pendientes 
        })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allUser !== this.props.allUser) {

      this.setState({
        alertPending: 0, // Resetea el estado a cero
        allowanceType: '', // Resetea el select de type
        allowanceStatus: '' // Resetea el select de Status
      }, () => {
        this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
      })

      // Si es admin y si esta en la ruta panel consulta la cantidad..
      if (this.props.user.isAdmin && this.props.allUser) {
        this.props.fetchCountPending(this.props.user.id)
          .then(count => {
            this.setState({ alertPending: count.data }) // Guarda cantidad de pendientes para alert al admin
          })
      }
    }
  }
  // FUNCION PARA FILTRAR POR ALLOWANCE
  handleClick(e) {
    console.log(e.target.value)
    const selectedMonth = moment().month() + 2;
    this.props.fetchAllowances(selectedMonth, this.props.user.id, e.target.value, this.state.allowanceStatus, this.props.allUser)
    this.setState({
      allowanceType: e.target.value
    })
  }

  // FUNCION PARA FILTRAR POR STATUS
  handleFilterStatus(e) {
    const selectedMonth = moment().month() + 2;
    this.props.fetchAllowances(selectedMonth,this.props.user.id, this.state.allowanceType, e.target.value, this.props.allUser)
    this.setState({
      allowanceStatus: e.target.value
    })
  }

  // FUNCION DE CONSULTA HISTORIAL / DETALLE
  viewDetails(id, allowanceId) {
    this.props.fetchAllowanceActive(id)
      .then(data => {
        let idUserHistory = data.activeAllowances.employeeDetail.id // Retorna el id del usuario del detalle seleccionado
        this.props.fetchAllowanceHistory(idUserHistory, allowanceId)
          .then(() => {
            this.setState({
              modal: true,
            });
          })
      })

  }

  // TOGGLE MODAL HISTORIAL / DETALLE
  toggleDetails() {
    this.setState({
      modal: !this.state.modal,
      activeItem: "1",
      msjSave: ''
    });
  }

  // TOGGLE MODAL AVISO
  toggleAviso() {
    this.setState({
      modalAviso: !this.state.modalAviso,
      msjSave: ''
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
  deleteAllowance(id) {
    this.setState({
      titleBoolean: "Are you sure you want to delete the information?",
      modalBoolean: true,
      data: {
        id
      }
    })
  }
  // FUNCION PARA EJECUTAR LA ACCION GENERICA DEL MODAL BOOLEAN
  actionOk(data) {
    this.props.deleteAllowance(data.id)
      .then(() => {
        this.setState({
          modalBoolean: false,
          modalAviso: true,
          textMsj: "The request has been successfully eliminated...",
          titleMsj: "Success"
        })
        this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
      })
      .catch(() => {
        this.setState({
          modalBoolean: false,
          modalAviso: true,
          textMsj: "Ups!, an error occurred while processing the request...",
          titleMsj: "Error"
        })
      })
  }
  // Funcion para updatear el status de los beneficios
  handleSaveConfirm(e) {
    e.preventDefault()
    this.props.editStatusAllowance(e.target.id.value, e.target.status.value, e.target.observation.value)
      .then(() => {
        this.setState({
          msjSave: 'Saved!'
        })
        this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
      })
      .catch(() => {
        this.setState({
          msjSave: 'Ups!, an error occurred while processing the request...'
        })
      })

  }
  render() {

    return (
      <div>
        <ModalDetails
          modal={this.state.modal}
          toggleDetails={this.toggleDetails}
          togglePanel={this.togglePanel}
          activeItem={this.state.activeItem}
          activeAllowance={this.props.activeAllowance}
          history={this.props.history}
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
        <AllowanceList
          alertPending={this.state.alertPending}
          handleClick={this.handleClick} // Filtro de tipo de beneficio
          handleFilterStatus={this.handleFilterStatus} // Filtro de status
          allowanceList={this.props.allowanceList} // Lista de los beneficios
          deleteAllowance={this.deleteAllowance} // Se envia la funcion para eliminar (onClick)
          viewDetails={this.viewDetails}  // Se envia la funcion para mostrar el modal (onClick)
          allUser={this.props.allUser} // Se envia si la ruta ingresada es "Panel" ( Esto bloqueará la opcion de eliminar )
          allowanceType={this.state.allowanceType} // valor de tipo de beneficio
          allowanceStatus={this.state.allowanceStatus} // valor del status actual
          adminAllowances={this.props.adminAllowances} // Boolean si es admin o no
        />
      </div>
    );
  }
}

const mapStateToProps = (state, owner) => {
  return {
    allowanceList: state.allowance.allowanceList,
    user: state.user.user,
    adminAllowances: state.allowance.adminAllowances,
    activeAllowance: state.allowance.activeAllowances,
    history: state.allowance.historyAllowances,
    // allUser => Consulta si la ruta ingresada es "/admin/panel", de ser correcto permite en el back mostrar u ocultar uno o todos los usuarios.
    allUser: (owner.match.path == "/admin/panel") // true o false
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchAllowances: (month, userId, allowanceId, status, allUser) => dispatch(fetchAllowances(month, userId, allowanceId, status, allUser)),
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
    fetchAllowanceActive: (id) => dispatch(fetchAllowanceActive(id)),
    fetchAllowanceHistory: (employeeId, allowanceId) => dispatch(fetchAllowanceHistory(employeeId, allowanceId)),//trae la data para el "history del detalle modal"
    deleteAllowance: (id) => dispatch(deleteAllowance(id)), // Elimina detalle 
    editStatusAllowance: (id, status, observation) => dispatch(editStatusAllowance(id, status, observation)), // Switch State
    fetchAdminAllowances: () => dispatch(fetchAdminAllowances()),
    fetchCountPending: (userId) => dispatch(fetchCountPending(userId)) // Consulta cantidad de allowance pendientes
  };
}
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AllowanceListContainer);