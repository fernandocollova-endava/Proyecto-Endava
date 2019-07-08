import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AllowanceContainer from '../AllowanceContainer/index'
import { fetchLoggedUser } from '../../redux/actions/user'
import Home from '../HomeContainer/index'
import ObraSocialContainer from '../ObraSocialContainer/index'
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
            //(!(this.props.user.id)) && <Redirect to="/login" />
          }
              <Route component = {NavbarContainer}/>
              <Switch>
              <Route path="/login" component={LoginContainer}/>
              <Route path="/allowance/:name" component={AllowanceContainer}/>
              <Route exact path="/allowance/obra-social" component={ObraSocialContainer }/>} 
              <Route exact path="/allowance/search" component={AllowancesListContainer}/>
              <Route exact path="/" component={Home}/>
              </Switch>                         
      </div>
    )
  }
}

const mapStateToProps = (state, owner) => {
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
