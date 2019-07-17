import React from 'react'
import {
 MDBTableBody, MDBTableHead, MDBIcon, MDBFormInline,
   MDBTable, MDBAnimation, MDBRow, MDBCol
} from "mdbreact";

import { columnsAllowance } from '../../auxFunctions/auxFunctions'

export default function allowanceList({
  allowanceList,
  adminAllowances,
  handleClick,
}) {
  return (
    <>
      {/* LISTADO  */}
      <div>
        <MDBRow className="container-banner">
          <MDBCol md="2">
            <h1 className="upperCaseFonts">Requests</h1>
          </MDBCol>
          <MDBCol md="4">
            <MDBFormInline className="md-form">
              <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp;
              <select className="browser-default custom-select" name="allowance" onChange={handleClick}>
                <option>Choose your allowance...</option>
                <option value="">All</option>
                {adminAllowances &&
                  adminAllowances.map(item => (
                    <option className="capitalizeName" key={item.id} value={item.id}>{item.name}</option>
                  ))}
              </select>
            </MDBFormInline>
          </MDBCol>
          <MDBCol md="3">

          </MDBCol>
          <MDBCol md="3">
            <MDBFormInline className="md-form">
              <MDBIcon icon="search" />
              <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
            </MDBFormInline>
          </MDBCol>
        </MDBRow>

        <hr />
        <MDBRow className="container-banner minHeight">
         
          <MDBCol md="12">
            <MDBAnimation type="fadeInUp">
              {(allowanceList.length == 0) ? <label>Sorry, there are no results for your selection... <br /><br /></label> :
                <MDBTable btn fixed responsive className="paddingTable">
                  <MDBTableHead columns={columnsAllowance} />
                  <MDBTableBody rows={allowanceList} />
                </MDBTable>}
            </MDBAnimation>
          </MDBCol>
          
        </MDBRow>
      </div>
    </>
  )
}
