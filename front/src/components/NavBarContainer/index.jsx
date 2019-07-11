import React, { Component } from "react";
import {
  MDBNavbar,MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBNavbarToggler
} from "mdbreact";
import {connect} from "react-redux"
import { Link } from "react-router-dom"
import {logout, fetchLoggedUser} from "../../redux/actions/user"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapseID: ""
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this)
  }
  componentDidMount(){
    this.props.fetchLoggedUser()
    window.scrollTo(0, 0)
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
    this.toggleSingleCollapse("collapse1")
    this.props.logout().then(res => {
      if (res === "logoutOK") this.props.history.push("/login");
    });
  }
  closeCollapse(collapseId) {
    this.setState({
      ...this.state,
      [collapseId]: false
    });
  }


  render() {
    return (
        <MDBNavbar className="fixed-top">
            <MDBNavbarBrand>
              <Link to="/" onClick={() => this.closeCollapse("collapse1")}>
              
                <img className="logo" 
                  src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/MetaDataImages/preview-image.ashx"
                  alt="Endava" />
              </Link>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => this.toggleSingleCollapse("collapse1")}>
            <MDBIcon icon="bars" size="2x"/>
            </MDBNavbarToggler>
            <MDBCollapse isOpen={this.state.collapse1} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/" onClick={() => this.toggleSingleCollapse("collapse1")}>Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/profile" onClick={() => this.toggleSingleCollapse("collapse1")}>Profile</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/allowance/search" onClick={() => this.toggleSingleCollapse("collapse1")}>My Allowances</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick= {this.handleLogOut}>Logout</MDBNavLink>
                </MDBNavItem>
                {this.props.user.isAdmin == true? 
                <MDBNavItem>
                  <MDBNavLink to="/admin/panel">Admin Panel</MDBNavLink>
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
