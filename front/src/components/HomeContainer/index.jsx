import React from "react";
import AnimationPage from "./employee";
import NavbarPage from "./homeAdmin";
import { connect } from "react-redux";
import { fetchLoggedUser, logout } from "../../redux/actions/user";

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.props.fetchLoggedUser();
  }
  handleLogOut() {
    this.props.logout().then(res => {
      console.log(res);
      if (res === "logoutOK") this.props.history.push("/login");
    });
  }

  render() {
    return (
      <div>
        <NavbarPage handleLogOut={this.handleLogOut} user={this.props.user} />
        <AnimationPage />
      </div>
    );
  }
}
const mapStateToProps = function(state) {
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => ({
  fetchLoggedUser: () => dispatch(fetchLoggedUser()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
