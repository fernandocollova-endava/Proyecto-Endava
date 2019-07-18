import React from "react";
import { connect } from "react-redux";
import AllowanceList from "./allowanceList";
import { fetchAllowances, fetchAllowanceActive, fetchAllowanceHistory, deleteAllowance, editStatusAllowance } from "../../redux/actions/allowanceActions"
import { MDBBtn } from "mdbreact";
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
      activeItem: "1",
      allowanceType: "",
      titleBoolean: '',
      msjSave:''
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
  }

  componentDidMount() {
    this.props.fetchAllowances(this.props.user.id)
    // llamar a adminAllowances
    this.props.openCloseNavBar(false)
  }
 

  // FUNCION PARA FILTRAR POR ALLOWANCE
  handleClick(e) {
    this.props.fetchAllowances(this.props.user.id, e.target.value)
    this.setState({
      allowanceType: e.target.value
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
      msjSave:''
    });
  }

  // TOGGLE MODAL AVISO
  toggleAviso() {
    this.setState({
      modalAviso: !this.state.modalAviso,
      msjSave:''
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
        this.props.fetchAllowances(this.props.user.id, this.state.allowanceType)
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
      .then(()=>{
        this.setState({
          msjSave:'Saved!'
        })
        this.props.fetchAllowances(this.props.user.id, this.state.allowanceType)
      })
      .catch(()=>{
        this.setState({
          msjSave:'Error!'
        })
      })

  }
  render() {
    // Condicional para redefinir los objetos
    let val = this.props.allowanceList;
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    val = val.map(a => {
      let split = (a.paymentDate).split('-')
      return {
        type: (a.allowanceDetail.name).toUpperCase(),
        name: (a.employeeDetail.name).toUpperCase(),
        amount: a.amount,
        limitAmount: a.limitAmount,
        employeeAmount: a.employeeAmount,
        paymentDate: `${Month[Number(split[1])]}-${split[0]}`,
        status: <label className={a.status}>{a.status}</label>,
        file: <MDBBtn
          className="mb-3 btnEv-red rounded mb-0 border-0"
          onClick={() => this.viewDetails(a.id, a.allowanceDetail.id)}
          color="default" rounded size="sm"><i key="cell3" className="far fa-file-pdf" size="2x" aria-hidden="true"></i> Details </MDBBtn>,
        delete: <>{(a.status === 'pending') ?
          <span onClick={() => this.deleteAllowance(a.id)}
            className="greyColor cursorPointer" ><i key="cell1" className="far fa-trash-alt iconAllowance " style={({ fontSize: 20 })}></i> Delete </span>
          : "-"}
        </>
      }
    })

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
          msjSave = {this.state.msjSave}
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
          allowanceList={val}
          adminAllowances={this.props.adminAllowances}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allowanceList: state.allowance.allowanceList,
    user: state.user.user,
    adminAllowances: state.allowance.adminAllowances,
    activeAllowance: state.allowance.activeAllowances,
    history: state.allowance.historyAllowances
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchAllowances: (data, allowanceId) => dispatch(fetchAllowances(data, allowanceId)),
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
    fetchAllowanceActive: (id) => dispatch(fetchAllowanceActive(id)),
    fetchAllowanceHistory: (employeeId, allowanceId) => dispatch(fetchAllowanceHistory(employeeId, allowanceId)),
    deleteAllowance: (id) => dispatch(deleteAllowance(id)), // Elimina detalle 
    editStatusAllowance: (id, status, observation) => dispatch(editStatusAllowance(id, status, observation)) // Switch State
  };
}
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AllowanceListContainer);