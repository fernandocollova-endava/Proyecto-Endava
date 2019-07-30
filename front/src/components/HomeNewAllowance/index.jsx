import React from "react";
import AnimationPage from "./newAllowance";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/user";
import { fetchAdminAllowances } from "../../redux/actions/allowanceActions"
import { openCloseNavBar } from "../../redux/actions/navbar"

class HomeNewAllowance extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount(){
    window.scrollTo(0, 0)
    this.props.openCloseNavBar(false)
    this.props.fetchAdminAllowances()
    
  }
  render() {
    return (
      <div>
         
        <AnimationPage 
        cardList = {this.props.adminAllowances}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    adminAllowances: state.allowance.adminAllowances
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchAdminAllowances: () => dispatch(fetchAdminAllowances()),
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeNewAllowance);