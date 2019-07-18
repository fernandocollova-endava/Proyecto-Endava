import React from "react";
import { connect } from "react-redux";
import AllowanceList from "./allowanceList";
import { fetchAdminAllowances, fetchAllowances, fetchAllowanceActive, fetchAllowanceHistory, deleteAllowance, editStatusAllowance } from "../../redux/actions/allowanceActions"
import { openCloseNavBar } from "../../redux/actions/navbar"
import ModalDetails from '../ModalContainer/modalDetail'
import ModalAviso from '../ModalContainer/modalAviso'
import ModalBoolean from '../ModalContainer/modalBoolean'
import { parserRow } from '../../auxFunctions/auxParser'

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
      allowanceStatus: ''
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
    this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
    this.props.fetchAdminAllowances()
    this.props.openCloseNavBar(false)
  }
  componentDidUpdate(prevProps, prevState) {
      if (prevProps.allUser !== this.props.allUser) {
          console.log(true);
          this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, this.state.allowanceStatus, this.props.allUser)
      }
  }
  // FUNCION PARA FILTRAR POR ALLOWANCE
  handleClick(e) {
    this.props.fetchAllowances(this.props.user.id, e.target.value, this.state.allowanceStatus, this.props.allUser)
    this.setState({
      allowanceType: e.target.value
    })
  }

  // FUNCION PARA FILTRAR POR STATUS
  handleFilterStatus(e) {
    this.props.fetchAllowances(this.props.user.id, this.state.allowanceType, e.target.value, this.props.allUser)
    this.setState({
      allowanceStatus: e.target.value
    })
  }

  // FUNCION DE CONSULTA HISTORIAL / DETALLE
  viewDetails(id, allowanceId) {
    this.props.fetchAllowanceActive(id)
    this.props.fetchAllowanceHistory(this.props.user.id, allowanceId)
      .then(() => {
        this.setState({
          modal: true,
        });
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

    // Condicional para redefinir los objetos
    let val = parserRow(
      this.props.allowanceList, // Se envia el listado a depurar
      this.deleteAllowance, // Se envia la funcion para eliminar (onClick)
      this.viewDetails,  // Se envia la funcion para mostrar el modal (onClick)
      this.props.allUser // Se envia si la ruta ingresada es "Panel" ( Esto bloqueará la opcion de eliminar )
    )

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
          allUser = {this.props.allUser}
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
          handleClick={this.handleClick}
          handleFilterStatus={this.handleFilterStatus}
          allowanceList={val}
          adminAllowances={this.props.adminAllowances}
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
    allUser:(owner.match.path == "/admin/panel") // true o false
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchAllowances: (userId, allowanceId, status, allUser) => dispatch(fetchAllowances(userId, allowanceId, status, allUser)),
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
    fetchAllowanceActive: (id) => dispatch(fetchAllowanceActive(id)),
    fetchAllowanceHistory: (employeeId, allowanceId) => dispatch(fetchAllowanceHistory(employeeId, allowanceId)),
    deleteAllowance: (id) => dispatch(deleteAllowance(id)), // Elimina detalle 
    editStatusAllowance: (id, status, observation) => dispatch(editStatusAllowance(id, status, observation)), // Switch State
    fetchAdminAllowances: () => dispatch (fetchAdminAllowances())
  };
}
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AllowanceListContainer);