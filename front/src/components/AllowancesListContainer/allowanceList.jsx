import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBIcon, MDBFormInline, MDBAnimation, MDBRow, MDBCol, MDBAlert
} from "mdbreact";

import RowAllowance from './rowAllowance'

export default function allowanceList({
  allowanceList,
  adminAllowances,
  handleClick,
  handleFilterStatus,
  alertPending,
  allowanceType,
  allowanceStatus,
  deleteAllowance,
  viewDetails,
  allUser,
  handleFilterPeriod
}) {
  return (
    <>
      {/* LISTADO  */}
      <div>
        <MDBRow className="container-banner">
          {/* <MDBCol md="2">
            <h1 className="upperCaseFonts">Requests</h1>
          </MDBCol> */}
          <MDBCol md="12">
            <p className="upperCaseFonts title-container" style={(allUser)?({backgroundColor: "#9bb4be"}):({})}>
              <span className="titleMain"><i className="fas fa-chart-bar"></i> {
                (allUser) ? "PANEL ADMIN!!" : "MY ALLOWANCE"
              } </span>

              <span className="form-inline md-form topMarginLine">
                {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
                <select value={allowanceType} className="browser-default custom-select" name="allowance" onChange={handleClick}>
                  <option value="">Choose your allowance...</option>
                  <option value="">All</option>
                  {adminAllowances &&
                    adminAllowances.map(item => (
                      <option className="capitalizeName" key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <select value={allowanceStatus} className="browser-default custom-select" name="status" onChange={handleFilterStatus}>
                  <option value="">Status...</option>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select className="browser-default custom-select" name="status" onChange={handleFilterPeriod}>
                  <option value="">Current month</option>
                  <option value="0">Last month</option>
                  <option value="1">Last two months</option>

                </select>
                <Link className="browser-default custom-select newRequest"
                  to="/allowance/new-allowance">
                  + New Allowance
              </Link>
              </span>
            </p>



          </MDBCol>

        </MDBRow>

        <hr />
        {(alertPending) ? <>
          <div style={({ maxWidth: 406, position: "fixed", bottom: 0 })}>
            <MDBAnimation type="heartBeat">
              <MDBAlert color="success" >
                <p>
                  <strong>Hello!</strong> You have {alertPending} allowance pending response...
            </p>
              </MDBAlert>

              <hr />
            </MDBAnimation>
          </div>
        </> : ''}
        <MDBRow className="container-banner minHeight">

          <MDBCol md="12">
            <MDBAnimation type="fadeInUp">
              {(allowanceList.length == 0) ? <label>Sorry, there aren't results for your selection... <br /><br /></label> :
                <div className="table-responsive">
                  <table className="table btn-table table-fixed paddingTable">
                    <thead className="">
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Limit</th>
                        <th>Emp. Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Info</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <RowAllowance
                      deleteAllowance={deleteAllowance} // Se envia la funcion para eliminar (onClick)
                      viewDetails={viewDetails}  // Se envia la funcion para mostrar el modal (onClick)
                      allUser={allUser} // Si es admin o no
                      allowanceList={allowanceList} // Listado de la consulta
                    />
                  </table>
                </div>
              }
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  )
}
