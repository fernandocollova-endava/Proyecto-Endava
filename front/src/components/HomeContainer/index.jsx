import React from "react";
import AnimationPage from "./home";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/user";
import { fetchAdminAllowances } from "../../redux/actions/allowanceActions"

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cardList:[]
    };
  }
  componentDidMount(){
    this.props.fetchAdminAllowances()
  }
  render() {
    return (
      <div>
        {console.log("so admin aloooo", this.props.adminAllowances)}
        <AnimationPage 
        cardList = {this.props.adminAllowances}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

    adminAllowances: state.allowance.adminAllowances
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAdminAllowances: () => dispatch(fetchAdminAllowances())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);