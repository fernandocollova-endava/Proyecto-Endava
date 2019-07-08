import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AllowanceContainer from '../AllowanceContainer/index'
import {fetchLoggedUser} from '../../redux/actions/user'
import Home from '../HomeContainer/index'
import NoFound from '../NoFound/index'  
import LoginContainer from "../LoginContainer";
import AllowancesListContainer from "../AllowancesListContainer";
import NavbarContainer from "../NavBarContainer/"

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.fetchLoggedUser()
  }

  render() {
    return ( 
      <div>
          {
            this.props.user.id?
            <div id="main" className="container">
              <Switch>
              <Route component = {NavbarContainer}/>
              <Route path="/allowance/:name" component={AllowanceContainer}/>
              <Route path="/" component={Home}/>
              <Route exact path="/allowance/search" component={AllowancesListContainer}/>
              </Switch>
            </div>:
               <Route exact path="/login" component={LoginContainer}/>
              }
      </div>
     
      )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);