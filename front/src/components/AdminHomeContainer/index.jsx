import React from 'react'
import { connect } from 'react-redux'
import AdminPanel from '../AdminHomeContainer/AdminPanel'
import { fetchPendingAllowances } from '../../redux/actions/allowanceActions'
import AllowanceList from "../AllowancesListContainer/allowanceList"

class AdminHomeContainer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchPendingAllowances()
    window.scrollTo(0, 0)
  }

  render() {
    // Condicional para redefinir los objetos
    let val = this.props.pendingAllowances;
    let Month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    val = val.map(a => {
      let split = (a.paymentDate).split('-')
      return {
        name: (a.allowance.name).toUpperCase(),
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
        <AllowanceList allowanceList={val} />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeContainer);