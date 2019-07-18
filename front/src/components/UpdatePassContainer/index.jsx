import React from "react";
import { connect } from "react-redux";
import { logginUser, updatePass } from "../../redux/actions/user";
import UpdatePass from "../UpdatePassContainer/updatePass";
import ModalAviso from "../ModalContainer/modalAviso";

class UpdatePassContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      passwordConfirm: "",
      modal: false,
      textMsj: "",
      titleMsj: "",
      value: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.passwordConfirm != this.state.password) {
      this.setState({
        error: true,
        modal: true,
        textMsj: "Your password/confirm password fields do not match",
        titleMsj: "Error"
      });
    } else {
      this.props
        .updatePass(this.state.password, this.props.user.id)
        .then(data => {
          this.props.history.push("/");
        })
        .catch(() => this.setState({ error: true }));
    }
  }

  // TOGGLE de MODAL
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <UpdatePass
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <ModalAviso
          modal={this.state.modal}
          toggle={this.toggle}
          textMsj={this.state.textMsj}
          titleMsj={this.state.titleMsj}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  logginUser: data => dispatch(logginUser(data)),
  updatePass: (password, user) => dispatch(updatePass(password, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassContainer);
