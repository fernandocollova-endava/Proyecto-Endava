import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLoggedUser } from '../../redux/actions/user'
import AllowanceContainer from '../AllowanceContainer/index'
import Home from '../HomeContainer/index'
import ObraSocialContainer from '../ObraSocialContainer/index'
import LoginContainer from "../LoginContainer";
import AllowancesListContainer from "../AllowancesListContainer/index";
import NavbarContainer from "../NavBarContainer/"
import FooterContainer from "../FooterContainer"
import UpdatePassContainer from "../UpdatePassContainer"
import AdminHomeContainer from "../AdminHomeContainer/index"
import DisciplineEvent from "../DisciplineEventContainer/index"

class MainContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
  
    this.props.fetchLoggedUser()
      .then(() => {

        this.setState({
          loading: false
        })
      })
  }

  render() {

    if (this.state.loading) {
      return 'loading'
    }
    return (


      <div>
        {
          this.props.user.id ?
            <div>
              <Route component={NavbarContainer} />
              <Switch>
              <Route exact path="/allowance/obra-social" component={ObraSocialContainer }/>} 
              <Route exact path="/allowance/search" component={AllowancesListContainer}/>
              <Route exact path="/allowance/:name" component={AllowanceContainer}/>
              <Route exact path="/login/expired" component={UpdatePassContainer}/>
              <Route exact path="/admin/panel" component={AdminHomeContainer}/> 
              <Route exact path="/disciplineEvent/new" component={DisciplineEvent}/> 

              <Route exact path="/" component={Home}/>
              <Redirect from="/login" to="/" />
              </Switch>
              <Route component = {FooterContainer}/>
            </div>: 
              <div>
               <Route path="/login" component={LoginContainer}/>
               <Redirect from="/" to="/login" component={LoginContainer} />
            </div>
                         
               }  
      </div>
    )
  }
}

const mapStateToProps = (state, own) => {
  return {
    location: own.location.pathname,
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
