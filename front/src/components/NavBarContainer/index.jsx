import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBHamburgerToggler
} from "mdbreact";
import {connect} from "react-redux"
import {logout, fetchLoggedUser} from "../../redux/actions/user"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapseID: ""
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount(){
    this.props.fetchLoggedUser()
  }
 
  toggleCollapse(collapseID) {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  }

  toggleSingleCollapse(collapseId) {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  }
  handleLogOut() {
    this.props.logout().then(res => {
      if (res === "logoutOK") this.props.history.push("/login");
    });
  }


  render() {
    return (
        <MDBNavbar color="amber lighten-4" style={{ marginTop: "20px" }} light>
            <MDBNavbarBrand>MDBNavbar</MDBNavbarBrand>
            <MDBHamburgerToggler
              color="#d3531a"
              id="hamburger1"
              onClick={() => this.toggleSingleCollapse("collapse1")}
            />
            <MDBCollapse isOpen={this.state.collapse1} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="#!">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#!">Link</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#!">Profile</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/allowance/search">historial de reintegros</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#!" onClick= {this.handleLogOut}>Logout</MDBNavLink>
                </MDBNavItem>
                {this.props.user.isAdmin == true? 
                <MDBNavItem>
                  <MDBNavLink to="#!">Admin Panel</MDBNavLink>
                </MDBNavItem>
                :null
                }
              </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
  }
}
const mapStateToProps = function(state) {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  fetchLoggedUser: ()=> dispatch(fetchLoggedUser()),
  logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
