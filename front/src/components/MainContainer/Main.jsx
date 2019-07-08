import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AllowanceContainer from '../AllowanceContainer/index'
import Home from '../HomeContainer/index'
import ObraSocialContainer from '../ObraSocialContainer/index'
import NoFound from '../NoFound/index'  
import LoginContainer from "../LoginContainer";


// Actions Create
//import { fetchLoggedUser, logout } from "../../redux/actions/user"

class MainContainer extends React.Component {
  componentDidMount() {
    // this.props.fetchLoggedUser()
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={LoginContainer}/>
          {/* {(!(this.props.UserId.hasOwnProperty('id')))&&<Redirect to='/login'/>} */}
          <Route exact path="/allowance/obra-social" component={ObraSocialContainer }/>} />
          <Route path="/allowance/:name" component={AllowanceContainer}/>} />
          <Route exact path="/" component={Home}/>

          {/* <Route path="/" component={NoFound} /> */}
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    //fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  };
};
const mapStateToProps = (state, owner)=>{
  return {
    UserId: state.user.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);