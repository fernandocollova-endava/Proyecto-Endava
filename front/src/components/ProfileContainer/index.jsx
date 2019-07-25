import React from "react";
import { connect } from "react-redux";
import { updatePass } from "../../redux/actions/user";
import Profile from "./profile";
import Modaluser from "../ModalContainer/modalUser";
import ModalAviso from "../ModalContainer/modalAviso";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msjSave: "",
      titleMsj: "",
      modalUser: false,
      modal: false,
      newPassword: "",
      oldPassword: ""
    };
    this.toggleModalUser = this.toggleModalUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handClick = this.handClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props
      .updatePass(this.state.newPassword, this.props.user.id, this.state.oldPassword)
      .then(response => { //recibo data ok y despliego modal
        this.setState({
          modal:true,
          msjSave:"The password has been changed successfully.",
          titleMsj: 'Success'
        })
      });
  }
  handClick() {
    this.setState({
      modalUser: !this.state.modalUser
    });
  }
  handleChange(e) {
   
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleModalUser() {
    this.setState({
      modalUser: !this.state.modalUser,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      msjSave: ""
    });
  }

  render() {
    return (
      <div>
        <Profile user={this.props.user} handClick={this.handClick} />;
        <Modaluser //Modal para visualizar/editar data del user
          modal={this.state.modalUser}
          toggle={this.toggleModalUser}
          handleSubmit={this.handleSubmit}
          user={this.props.user}
          handleChange={this.handleChange}
        />
        <ModalAviso //Modal de confirmacion de cambio de clave Ok
         toggle={this.toggleModal}
         modal={this.state.modal}
         textMsj={this.state.msjSave}
         titleMsj= {this.state.titleMsj}
         />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  updatePass:(pass,userId, oldPass)=> dispatch(updatePass(pass, userId, oldPass))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
