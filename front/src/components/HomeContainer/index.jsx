import React from "react";
import AnimationPage from "./home";
import NavBarContainer from "../NavBarContainer";
import { connect } from "react-redux";
import { fetchLoggedUser, logout } from "../../redux/actions/user";

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {};

  }
  render() {
    return (
      <div>
        <AnimationPage />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
 
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(HomeContainer);
