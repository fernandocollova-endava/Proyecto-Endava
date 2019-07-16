import React from 'react'
import { connect } from 'react-redux'
import { fetchPendingAllowances } from '../../redux/actions/allowanceActions'
import AllowanceList from "../AllowancesListContainer/allowanceList"
import { MDBBtn } from "mdbreact";
import { openCloseNavBar } from "../../redux/actions/navbar"

class AdminHomeContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      activeFile: ''
    }
    this.viewFile = this.viewFile.bind(this)
  }
  componentDidMount() {
    this.props.fetchPendingAllowances()
    window.scrollTo(0, 0)
    this.props.openCloseNavBar(false)
  }
  viewFile(file) {
    this.setState({
      activeFile: file
    })
  }
  render() {
    // Condicional para redefinir los objetos
    let val = this.props.pendingAllowances;
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    val = val.map(a => {
      let split = (a.paymentDate).split('-')
      return {
        name: (a.allowanceDetail.name).toUpperCase(),
        user:(a.employeeDetail.name).toUpperCase(),
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
        <AllowanceList allowanceList={val} 
        activeFile={this.state.activeFile}/>
        {/* <AdminPanel pendingAllowances= {this.props.pendingAllowances}/> */}
      </div>
    )
  }
}
const mapStateToProps = function (state) {
  return {
    pendingAllowances: state.allowance.pendingAllowances
  };
};
const mapDispatchToProps = dispatch => ({
  fetchPendingAllowances: () => dispatch(fetchPendingAllowances()),
  openCloseNavBar: (val) => dispatch(openCloseNavBar(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeContainer);