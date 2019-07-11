import React from "react";
import {connect } from "react-redux";
import Login from "./login";
import {loginUser} from "../../redux/actions/user"
import validate from "../../auxFunctions/auxFunctions"
import UpdatePassContainer from "../UpdatePassContainer"
 
import {logginUser} from "../../redux/actions/user"
import ModalAviso from "../ModalContainer/modalAviso" 

class LoginContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: "",
      modal: false,
      textMsj: '', titleMsj: ''
  }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggle = this.toggle.bind(this)
}
componentDidMount(){
  if (this.props.user.id) {
     this.props.history.push("/")
  } 
}

handleChange(e){

    this.setState({
      [e.target.name]:e.target.value
    })
}
handleSubmit(e){
  e.preventDefault();
  // if(!validate(this.state)){
  //   console.log(validate(this.state), "soooo validaeeeeeeee")
    this.props.loginUser(this.state)
    .then((user)=>{
       
        if (user.passwordChanged == false) {
          console.log("enre a ese iffffffff")
          this.props.history.push("/passwordExpired")
        }else this.props.history.push("/")
    }).catch(() => {
      this.setState({ error: true,
        modal: true, textMsj: 'Please verify your username or  password..', titleMsj: 'Error'  })
    })
    
  // }
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
      <br/><br/><br/><br/>
        <Login handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
      </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}
const mapDispatchToProps = (dispatch) => (
  {
      loginUser: (data) => dispatch(loginUser(data))
  })



export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);