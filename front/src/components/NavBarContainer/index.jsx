import React, { Component } from "react";
import { MDBNavbar, MDBIcon, MDBNavbarBrand, MDBNavbarToggler, MDBAnimation } from "mdbreact";
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
          <MDBAnimation type="flipInY">
            <img src={`/assets/img/profile/${this.props.avatar}`} className="float-left imgProfileNav" alt="Avatar profile"></img>
            <MDBIcon icon="bars" size="2x" />
          </MDBAnimation>
        </MDBNavbarToggler>
        <div id="sideNavigation" style={({ width: (this.props.navWidth) ? 300 : 0 })} className="upperCaseFonts sidenav">
          <span className="nameFontSidebar">
            Welcome <br />
            {
              (this.props.user.isAdmin) ?
                <i className="fas fa-user-tie iconAvatar"></i> :
                <i className="far fa-user iconAvatar"></i>
            }
            {this.props.user.name}
          </span>
          <span className="closebtn" onClick={() => this.closeCollapse()}> &times; </span>
          <hr />
          <table style={({ marginTop: -21 })}>
            <tbody>
              <tr>
                <td><Link className={`item ${(location == "/") && "itemActive"}`} to="/" onClick={() => this.closeCollapse()} style={({ fontSize: 22 })}><i className="fas fa-home"></i> Home </Link>
                </td>
                <td>&#124;</td>
                <td><span className="item" onClick={this.handleLogOut} style={({ fontSize: 22 })}><i className="fas fa-sign-out-alt"></i> Logout </span></td>
              </tr>
            </tbody>
          </table>
          <hr className="separationClass" />

          <Link className={`item ${(location == "/profile") && "itemActive"}`} to="/profile" onClick={() => this.closeCollapse()}> Profile </Link>
          <Link className={`item ${(location == "/allowance/new-allowance") && "itemActive"}`} to="/allowance/new-allowance" onClick={() => this.closeCollapse()}> New Allowance ! </Link>
          <Link className={`item ${(location == "/allowance/search") && "itemActive"}`} to="/allowance/search" onClick={() => this.closeCollapse()}> My Allowances </Link>
          <Link className={`item ${(location == "/home-office") && "itemActive"}`} to="/home-office" onClick={() => this.closeCollapse()}> Home Office </Link>
          <Link className={`item ${(location == "/health-care") && "itemActive"}`} to="/health-care" onClick={() => this.closeCollapse()}> Health care </Link>
          <Link className={`item ${(location == "/calendar") && "itemActive"}`} to="/calendar" onClick={() => this.closeCollapse()}> Event calendar</Link>
          <Link className={`item ${(location == "/discipline-event/new") && "itemActive"}`} to="/discipline-event/new" onClick={() => this.closeCollapse()}> Discipline Event </Link>

          {this.props.user.isAdmin == true ?
            <>
              {/* <Link className={`item ${(location == "/admin/book") && "itemActive"}`} to="/admin/book" onClick={() => this.closeCollapse()}> Admin Book Panel</Link> */}
              <Link className={`item ${(location.indexOf('/admin/') !== -1) && "itemActive"}`} to="/admin/panel" onClick={() => this.closeCollapse()}> Admin Panel </Link>

            </>
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
    avatar: state.user.avatar
  };
};
const mapDispatchToProps = dispatch => ({
  fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  logout: () => dispatch(logout()),
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
