import React from "react";
import {connect } from "react-redux";
import Login from "./login";
import {loginUser} from "../../redux/actions/user"
import validate from "../../auxFunctions/auxFunctions"
import UpdatePassContainer from "../UpdatePassContainer"
 
class LoginContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: ""
  }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
    })
    .catch(() => this.setState({ error: true }))
    
  // }
}


  render() {
    return (
      <div className="imageLogin">
      <br/><br/><br/><br/>
        <Login handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
      </div>
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