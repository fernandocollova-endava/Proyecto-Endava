import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import { loginUser } from "../../redux/actions/user";
import validate from "../../auxFunctions/auxFunctions";
import UpdatePassContainer from "../UpdatePassContainer";
import { logginUser } from "../../redux/actions/user";
import ModalAviso from "../ModalContainer/modalAviso";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      modal: false,
      textMsj: "",
      titleMsj: "",
      value: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeRemember = this.onChangeRemember.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    var cookieEmail = this.getCookie();
    if (cookieEmail) {
      this.setState({
        email: cookieEmail,
        value: true
      });

      // }
      if (this.props.user.id) {
        this.props.history.push("/");
      }
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value == true) {
      var username = this.state.email;
      this.setCookie(username);
    } else {
      this.deleteCookie(username);
    }
    this.props
      .loginUser(this.state)
      .then(user => {
        if (user.passwordChanged == false) this.props.history.push("/login/expired");
        else this.props.history.push("/");
      })
      .catch(() => {
        this.setState({
          error: true,
          modal: true,
          textMsj: "Please verify your username or  password..",
          titleMsj: "Error"
        });
      });

    // }
  }

  onChangeRemember(e) {
    this.setState(
      ({ value }) => ({ value: !value }) // siempre que quiero usar cambios de estados dentro de un set state, se usa asi
    );
  }
  setCookie(username) {
    var d = new Date();
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000); //setea duracion por ej, de 7 dias
    var expires = " expires= " + d.toUTCString();
    document.cookie = "=" + username + expires;
  }
  deleteCookie() {
    var d = new Date();
    d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1000); // setea al dia de ayer su expiracion
    var expires = "expires=" + d.toUTCString();
    window.document.cookie = "= " + "; " + expires;
  }
  getCookie() {
    var cookieUser = document.cookie;
    var userName = cookieUser.slice(0, cookieUser.indexOf(".com") + 4);
    if (userName.length) return userName;
    
  }

  // TOGGLE de MODAL
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <>
        <ModalAviso
          modal={this.state.modal}
          toggle={this.toggle}
          textMsj={this.state.textMsj}
          titleMsj={this.state.titleMsj}
        />
        <div className="imageLogin">
            <br />
          <div className="HideMobile">
            <br />
            <br />
            <br />
          </div>
          <Login
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            onChangeRemember={this.onChangeRemember}
            value={this.state.value}
            userCookie={this.state.email}
            checkImputValue={this.state.checkImputValue}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
