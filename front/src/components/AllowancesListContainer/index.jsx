import React from "react";
import {connect} from "react-redux";
import AllowanceList from "./allowanceList";
import {fetchAllowances, fetchAdminAllowances} from "../../redux/actions/allowanceActions"

class AllowanceListContainer extends React.Component {
  constructor(){
    super()
    this.state = {}


    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){

    this.props.fetchAllowances(this.props.user.id)
    this.props.fetchAdminAllowances()

  }
  handleClick(allowanceId){

  this.props.fetchAllowances(this.props.user.id, allowanceId)
  }
  render() {
    return (
      <div>
        {console.log("so allowanse lissssss", this.props.adminAllowances)}
        <AllowanceList handleClick = {this.handleClick} allowanceList = {this.props.allowanceList} adminAllowances = {this.props.adminAllowances}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allowanceList : state.allowance.allowanceList,
    user: state.user.user,
    adminAllowances: state.allowance.adminAllowances
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    fetchAllowances: (data, allowanceId) => dispatch(fetchAllowances(data, allowanceId)),
    fetchAdminAllowances: () => dispatch(fetchAdminAllowances())
  }
}


export default connect(mapStateToProps, MapDispatchToProps)(AllowanceListContainer);