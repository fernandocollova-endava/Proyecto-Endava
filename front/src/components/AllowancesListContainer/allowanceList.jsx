import React from 'react'
import {
  MDBDropdown, MDBDropdownToggle, MDBTableBody, MDBTableHead,
  MDBDropdownMenu, MDBDropdownItem, MDBTable, MDBAnimation, MDBRow, MDBCol
} from "mdbreact";

import { columnsAllowance, rows_outline_btn } from '../../auxFunctions/auxFunctions'

export default function allowanceList({
  allowanceList,
  adminAllowances,
  handleClick
}) {
  return (
    <>
    {console.log("so admin alo", adminAllowances)}
      <MDBAnimation type="fadeInUp">
        <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/MeetEndava/MeetEndava_1920x650_resized.ashx"
          className="img-fluid bannerAllowance"
          alt="Imagen endava" />
      </MDBAnimation>
      <hr />
      {/* LISTADO  */}
      <div>
        <MDBDropdown>
          <MDBDropdownToggle caret color="primary">
            Allowances
        </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              <MDBDropdownItem> All </MDBDropdownItem>
            </button>
            {adminAllowances &&
              adminAllowances.map(item => (

                <button
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <MDBDropdownItem> {item.name}</MDBDropdownItem>
                </button>
              ))}
          </MDBDropdownMenu>
        </MDBDropdown>

        <hr />
        <MDBRow className="container-banner">
          <MDBCol md="1">

          </MDBCol>
          <MDBCol md="8">
            <h1 className="upperCaseFonts">Requests</h1>
            <MDBAnimation type="fadeInUp">
              <MDBTable btn>
                <MDBTableHead columns={columnsAllowance} />
                <MDBTableBody rows={allowanceList} />
              </MDBTable>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="1">
          
          </MDBCol>
        </MDBRow>

      </div>
    </>
  )
}
