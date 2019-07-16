import React from "react";
import { connect } from "react-redux";
import AllowanceList from "./allowanceList";
import { fetchAllowances } from "../../redux/actions/allowanceActions"
import { MDBBtn } from "mdbreact";
import { openCloseNavBar } from "../../redux/actions/navbar"

class AllowanceListContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      activeFile: ''
    }
    this.viewFile = this.viewFile.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllowances(this.props.user.id)
    this.props.openCloseNavBar(false)
  }

  handleClick(allowanceId) {
    this.props.fetchAllowances(this.props.user.id, allowanceId)
    this.setState({
      activeFile: ''
    })
  }
  viewFile(file) {
    this.setState({
      activeFile: file
    })
  }

  render() {
    // Condicional para redefinir los objetos
    let val = this.props.allowanceList;
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    val = val.map(a => {
      let split = (a.paymentDate).split('-')
      return {
        name: (a.allowanceDetail.name).toUpperCase(),
        user:a.employeeDetail.name,
        amount: a.amount,
        limitAmount: a.limitAmount,
        employeeAmount: a.employeeAmount,
        paymentDate: `${Month[Number(split[1])]}-${split[0]}`,
        status: <label className={a.status}>{a.status}</label>,
        file: <MDBBtn
          className="mb-3 btnEv-red rounded mb-0 border-0"
          onClick={() => this.viewFile(a.receiptPath)}
          color="default" rounded size="sm"><i key="cell3" className="far fa-file-pdf" size="2x" aria-hidden="true"></i> View </MDBBtn>
      }
    })

    return (
      <div>
        <AllowanceList
          activeFile={this.state.activeFile}
          handleClick={this.handleClick}
          allowanceList={val}
          adminAllowances={this.props.adminAllowances} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allowanceList: state.allowance.allowanceList,
    user: state.user.user,
    adminAllowances: state.allowance.adminAllowances
  };
};

const MapDispatchToProps = dispatch => {
  return {
    fetchAllowances: (data, allowanceId) => dispatch(fetchAllowances(data, allowanceId)),
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
  };
}
export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AllowanceListContainer);