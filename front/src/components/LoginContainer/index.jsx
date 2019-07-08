import React from "react";
import {connect } from "react-redux";
import Login from "./login";
import {logginUser} from "../../redux/actions/user"
import validate from "../../auxFunctions/auxFunctions"
 
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

handleChange(e){

    this.setState({
      [e.target.name]:e.target.value
    })
}
handleSubmit(e){
  e.preventDefault();
  // if(!validate(this.state)){
  //   console.log(validate(this.state), "soooo validaeeeeeeee")
    this.props.logginUser(this.state)
    .then(()=>this.props.history.push("/"))
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
const mapDispatchToProps = (dispatch) => (
  {
      logginUser: (data) => dispatch(logginUser(data))
  })



export default connect(null, mapDispatchToProps)(LoginContainer);