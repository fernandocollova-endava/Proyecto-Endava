import React from "react";
import { connect } from "react-redux";
import { updatePass, updateAvatar } from "../../redux/actions/user";
import Profile from "./profile";
import Modaluser from "../ModalContainer/modalUser";
import ModalAviso from "../ModalContainer/modalAviso";
import ModalAvatarComponent from "../ModalContainer/Avatar";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msjSave: "",
      titleMsj: "",
      modalUser: false,
      modalAvatar: false,
      modal: false,
      newPassword: "",
      oldPassword: "",
      passwordConfirm: "",
      file: null
    };

    this.toggleModalUser = this.toggleModalUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handClick = this.handClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.toggleModalAvatar = this.toggleModalAvatar.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
   
    if (this.state.passwordConfirm != this.state.newPassword) {
      this.setState({   //pregunto si coinciden los pass nuevos
        error: true,
        modal: true,
        msjSave: "Your password/confirm password fields do not match",
        titleMsj: "Error"
      });
    } else {
      this.props
        .updatePass(
          this.state.newPassword,
          this.props.user.id,
          this.state.oldPassword
        )
        .then(response => {
          //recibo data ok y despliego modal
          if (response == "ok") {
            this.setState({
              modal: true,
              msjSave: "The password has been changed successfully.",
              titleMsj: "Success"
            });
          } else {
            this.setState({
              modal: true,
              msjSave: "Please verify your password..",
              titleMsj: "Error"
            });
          }
        });
    }
  }
  handClick() {
    this.setState({
      modalUser: !this.state.modalUser
    });
  }
  // Modal Avatar
  toggleModalAvatar() {
    this.setState({
      modalAvatar: !this.state.modalAvatar,
      msjSave: ""
    });
  }
  // Submit avatar
  handleSubmitAvatar(e) {
    e.preventDefault();
    const { file, ...rest } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userid", this.props.user.id);

    // Modifica el avatar
    this.props.updateAvatar(formData);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  toggleModalUser() {
    this.setState({
      modalUser: !this.state.modalUser
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      msjSave: ""
    });
  }
  handleImageChange(e) {
    this.setState({
      modalAvatar: !this.state.modalAvatar,
      msjSave: ""
    });
  }
  render() {
    return (
      <div>
        <Profile
          user={this.props.user}
          handClick={this.handClick}
          handleImageChange={this.handleImageChange}
          avatar={this.props.avatar}
        />
        ;
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
          titleMsj={this.state.titleMsj}
        />
        <ModalAvatarComponent //Modal para modificar la imagen de perfil
          toggleModalAvatar={this.toggleModalAvatar}
          modalAvatar={this.state.modalAvatar}
          handleSubmitAvatar={this.handleSubmitAvatar}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    avatar: state.user.avatar
  };
};
const mapDispatchToProps = dispatch => ({
  updatePass: (pass, userId, oldPass) =>
    dispatch(updatePass(pass, userId, oldPass)),
  updateAvatar: (img, id) => dispatch(updateAvatar(img, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
