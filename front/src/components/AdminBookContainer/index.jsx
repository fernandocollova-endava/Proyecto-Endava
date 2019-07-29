import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchBookAllowances,
  fetchAllowanceActive,
  fetchAllowanceHistory,
  fetchBookInstallments,
  deleteAllowance,
  editStatusAllowance,
  fetchCountPending,
  fetchCurrentBookA
} from "../../redux/actions/allowanceActions";
import { openCloseNavBar } from "../../redux/actions/navbar";
import ModalBookDetails from "../ModalContainer/ModalBookDetail";
import ModalAviso from "../ModalContainer/modalAviso";
import ModalBoolean from "../ModalContainer/modalBoolean";
import AdminBook from "../AdminBookContainer/adminBook";

class AdminBookContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      modalAviso: false,
      modalBoolean: false,
      activeAllowance: {},
      history: [],
      activeItem: "1",
      allowanceType: "book",
      titleBoolean: "",
      msjSave: "",
      allowanceStatus: "",
      alertPending: 0,
      selectedMonth: 0
    };

    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.toggleAviso = this.toggleAviso.bind(this);
    this.deleteAllowance = this.deleteAllowance.bind(this);
    this.actionOk = this.actionOk.bind(this);
    this.handleFilterStatus = this.handleFilterStatus.bind(this);
    this.handleSaveConfirm = this.handleSaveConfirm.bind(this);
  }

  componentDidMount() {
    this.props.openCloseNavBar(false);
    const selectedMonth = moment().month() + 2;
    this.props.fetchCurrentBookA(
      selectedMonth,
      this.props.adminPath,
      this.props.user.id
    );
    this.setState(
      {
        selectedMonth: selectedMonth
      },
      () => {
        this.props.fetchCurrentBookA(
          this.state.selectedMonth,
          this.props.adminPath,
          this.props.user.id
        );
        // this.props.fetchBookAllowances();
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.adminPath !== this.props.adminPath) {
      this.props
        .fetchCurrentBookA(
          this.state.selectedMonth,
          this.props.adminPath,
          this.props.user.id
        )
        .then(() =>
          this.props.fetchBookAllowances(
            this.props.user.id,
            this.props.adminPath
          )
        );
    }
  }

  // FUNCION DE CONSULTA HISTORIAL / DETALLE
  viewDetails(id, allowanceId, receiptPath) {
  
    this.props.fetchAllowanceActive(id).then(data => {
       
      // let idUserHistory = data.activeAllowances.employeeDetail.id; // Retorna el id del usuario del detalle seleccionado
      this.props.fetchBookInstallments(receiptPath, allowanceId).then(() => {
        
        this.setState({
          modal: true
        });
      });
    });
  }
  handleFilterStatus(e) {
    this.props.fetchCurrentBookA(
      this.state.selectedMonth,
      this.props.adminPath,
      this.props.user.id
    );
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
  deleteAllowance(id) {
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
      .deleteAllowance(data.id)
      .then(() => {
        this.setState({
          modalBoolean: false,
          modalAviso: true,
          textMsj: "The request has been successfully eliminated...",
          titleMsj: "Success"
        });
        const selectedMonth = moment().month() + 2;
        this.props.fetchCurrentBookA(
          selectedMonth,
          this.props.adminPath,
          this.props.user.id
        );
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
    this.props
      .editStatusAllowance(
        e.target.id.value,
        e.target.status.value,
        e.target.observation.value
      )
      .then(() => {
        this.setState({
          msjSave: "Saved!"
        });
        const selectedMonth = moment().month() + 2;
        this.props.fetchCurrentBookA(
          selectedMonth,
          this.props.adminPath,
          this.props.user.id
        );
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
        {/* {console.log("soy current", this.props.bookInstallments)} */}
        <ModalBookDetails
          modal={this.state.modal}
          toggleDetails={this.toggleDetails}
          togglePanel={this.togglePanel}
          activeItem={this.state.activeItem}
          activeAllowance={this.props.activeAllowance}
          history={this.props.bookInstallments}
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
        <AdminBook
          alertPending={this.state.alertPending}
          handleClick={this.handleClick}
          handleFilterStatus={this.handleFilterStatus}
          bookAllowances={this.props.currentBookAllowances}
          allowanceStatus={this.state.allowanceStatus}
          deleteAllowance={this.props.deleteAllowance}
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
    bookAllowances: state.allowance.bookAllowances,
    activeAllowance: state.allowance.activeAllowances,
    history: state.allowance.historyAllowances, //
    bookInstallments: state.allowance.bookInstallments,
    adminPath: own.match.path == "/admin/book", // adminPath => consulta que la ruta corresponda a admin
    currentBookAllowances: state.allowance.currentBookAllowances //busco libros p/mes actual
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchBookAllowances: (user, adminPath) =>
      dispatch(fetchBookAllowances(user, adminPath)),
    openCloseNavBar: val => dispatch(openCloseNavBar(val)),
    fetchAllowanceActive: id => dispatch(fetchAllowanceActive(id)),
    fetchAllowanceHistory: (employeeId, allowanceId) =>
      dispatch(fetchAllowanceHistory(employeeId, allowanceId)), //trae la data para el "history del detalle modal"
    deleteAllowance: id => dispatch(deleteAllowance(id)), // Elimina detalle
    editStatusAllowance: (id, status, observation) =>
      dispatch(editStatusAllowance(id, status, observation)), // Switch State
    fetchCountPending: userId => dispatch(fetchCountPending(userId)), // Consulta cantidad de allowance pendientes
    fetchCurrentBookA: (month, adminPath, userId) =>
      dispatch(fetchCurrentBookA(month, adminPath, userId)),
    fetchBookInstallments: (receiptPath, allowanceId) =>
      dispatch(fetchBookInstallments(receiptPath, allowanceId))
  };
};
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AdminBookContainer);
