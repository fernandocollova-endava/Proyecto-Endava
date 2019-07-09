import React from "react";
import {connect} from "react-redux";
import AllowanceList from "./allowanceList";
import {fetchAllowances} from "../../redux/actions/allowanceActions"

class AllowanceListContainer extends React.Component {
  constructor(){
    super()
    this.state = {}
  }
  componentDidMount(){
    this.props.fetchAllowances(this.props.user.id)

  }
  render() {
    return (
      <div>
        {console.log("so lis de allowances", this.props.allowanceList)}
        <AllowanceList/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allowanceList : state.allowance.allowanceList,
    user: state.user.user
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    fetchAllowances: (data) => dispatch(fetchAllowances(data))
  }
}


export default connect(mapStateToProps, MapDispatchToProps)(AllowanceListContainer);