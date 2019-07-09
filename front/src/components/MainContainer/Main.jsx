import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AllowanceContainer from '../AllowanceContainer/index'
import {fetchLoggedUser} from '../../redux/actions/user'
import Home from '../HomeContainer/index'
import ObraSocialContainer from '../ObraSocialContainer/index'
import LoginContainer from "../LoginContainer";
import AllowancesListContainer from "../AllowancesListContainer/index";
import NavbarContainer from "../NavBarContainer/"

class MainContainer extends React.Component {
  constructor(){
    super()
    this.state ={
      loading: true
    }
  }
  componentDidMount() {
    this.props.fetchLoggedUser()
    .then(()=>{

      this.setState({
        loading:false
      })
    })
  }

  render() {

    if (this.state.loading) {
      return 'loading'
    }
    return ( 
    
    // <div>
    //   <Switch>
    //    <Route path="/login" component={LoginContainer}/>
    //   {this.props.user.id? <Route component = {NavbarContainer}/>: null}
    //   {/* <Route exact path="/allowance/search" component={AllowancesListContainer}/> */}
    //   {/* <Route exact path="/allowance/:name" component={AllowanceContainer}/>
    //   <Route exact path="/allowance/obra-social" component={ObraSocialContainer }/>}  */}
    //   <Route path="/" component={Home}/>
    //   </Switch>
    // </div>
      <div>
          {/* {
            this.props.user.id ? */}
            <div>
              <Route component = {NavbarContainer}/>
              <Switch>
              <Route exact path="/allowance/obra-social" component={ObraSocialContainer }/>} 
              <Route exact path="/allowance/search" component={AllowancesListContainer}/>
              <Route path="/allowance/:name" component={AllowanceContainer}/>
              <Route exact path="/" component={Home}/>
              <Redirect from="/login" to="/" />
              </Switch>
            </div>: 
              <div id="main" className="container">
               <Route path="/login" component={LoginContainer}/>
               {/* <Redirect from="/"  component={LoginContainer} /> */}
            </div>
                         
              {/* } */}
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