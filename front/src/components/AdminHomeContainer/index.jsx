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
    val = val.map(a => {
      return {
        name: a.allowance.name,
        amount: a.amount,
        limitAmount: a.limitAmount,
        employeeAmount: a.employeeAmount,
        paymentDate: a.paymentDate,
        status: a.status
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