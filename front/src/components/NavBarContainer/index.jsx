import React, { Component } from "react";
import { MDBNavbar, MDBIcon, MDBNavbarBrand, MDBNavbarToggler } from "mdbreact";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout, fetchLoggedUser } from "../../redux/actions/user"
import { openCloseNavBar } from "../../redux/actions/navbar"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogOut = this.handleLogOut.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this)
    this.openNavbar = this.openNavbar.bind(this)
  }

  componentDidMount() {
    this.props.fetchLoggedUser()
    window.scrollTo(0, 0)
  }

  handleLogOut() {
    this.props.openCloseNavBar(false)
    this.props.logout().then(res => {
      if (res === "logoutOK") this.props.history.push("/login");
    });
  }

  openNavbar() {
    this.props.openCloseNavBar(true)
  }

  closeCollapse() {
    this.props.openCloseNavBar(false)
  }

  render() {
    const { location } = this.props;

    return (
      <MDBNavbar className="fixed-top">
        <MDBNavbarBrand>
          <Link to="/" onClick={() => this.closeCollapse()}>
            <img className="logo"
              src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/MetaDataImages/preview-image.ashx"
              alt="Endava" />
          </Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler right onClick={() => this.openNavbar()}>
          <MDBIcon icon="bars" size="2x" />
        </MDBNavbarToggler>
        <div id="sideNavigation" style={({ width: (this.props.navWidth) ? 300 : 0 })} className="upperCaseFonts sidenav">
          <Link className="closebtn" onClick={() => this.closeCollapse()}> &times; </Link>
          <hr />
          <Link className={`item ${(location == "/") && "itemActive"}`} to="/" onClick={() => this.closeCollapse()}> Home </Link>
          <Link className={`item ${(location == "/profile") && "itemActive"}`} to="/profile" onClick={() => this.closeCollapse()}> Profile </Link>
          <Link className={`item ${(location == "/allowance/search") && "itemActive"}`} to="/allowance/search" onClick={() => this.closeCollapse()}> My Allowances </Link>
          <Link className={`item ${(location == "/discipline-event/new") && "itemActive"}`} to="/discipline-event/new" onClick={() => this.closeCollapse()}> Discipline Event </Link>
          <Link className="item" onClick={this.handleLogOut}> Logout </Link>
          {this.props.user.isAdmin == true ?
            <Link className={`item ${(location == "/admin/panel") && "itemActive"}`} to="/admin/panel" onClick={() => this.closeCollapse()}> Admin Panel </Link>
            : null
          }
        </div>
      </MDBNavbar>
    );
  }
}
const mapStateToProps = function (state, own) {
  return {
    user: state.user.user,
    navWidth: state.nav.status,
    location: own.location.pathname,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  logout: () => dispatch(logout()),
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
