import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AllowanceContainer from '../AllowanceContainer/index'
import Home from '../HomeContainer/index'
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
          <Route path="/allowance/:name" component={AllowanceContainer}/>} />
          <Route exact path="/login" component={LoginContainer}/>
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
export default connect(
  null,
  mapDispatchToProps
)(MainContainer);