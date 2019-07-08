import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler
} from "mdbreact";

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapseID: ""
    };
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

  render() {
    return (
      <MDBContainer>
        <MDBNavbar color="amber lighten-4" style={{ marginTop: "20px" }} light>
          <MDBContainer>
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
                  <MDBNavLink to="#!" onClick= {this.props.handleLogOut}>Logout</MDBNavLink>
                </MDBNavItem>
                {this.props.user.isAdmin == true? 
                <MDBNavItem>
                  <MDBNavLink to="#!">Admin Panel</MDBNavLink>
                </MDBNavItem>
                :null
                }
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>
    );
  }
}

export default NavbarPage;
