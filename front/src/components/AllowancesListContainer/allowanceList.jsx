import React from 'react'
import {
  MDBDropdown, MDBDropdownToggle, MDBTableBody, MDBTableHead,MDBBtn, 
  MDBDropdownMenu, MDBDropdownItem, MDBTable, MDBAnimation, MDBRow, MDBCol
} from "mdbreact";

import { columnsAllowance } from '../../auxFunctions/auxFunctions'

export default function allowanceList({
  allowanceList,
  adminAllowances,
  handleClick,
  activeFile
}) {
  return (
    <>
      
      
      {/* LISTADO  */}
      <div>
      <h1 className="upperCaseFonts">
      <MDBAnimation type="fadeInUp">
        <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/About/News/2019/Endava-Opens-Two-New-Software-Centres-In-Timisoara-And-Brasov/480x500.ashx"
          className="img-fluid bannerAllowance"
          alt="Imagen endava"
          width="100px" />
      </MDBAnimation>
      Requests</h1>
        <MDBDropdown>
          <MDBDropdownToggle caret color="primary">
            Select Allowances
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
        <MDBRow className="container-banner minHeight">
          <MDBCol md="1">
          </MDBCol>
          <MDBCol md="10">
            
            <MDBAnimation type="fadeInUp">              
              {(allowanceList.length == 0)? <label>Sorry, there are no results for your selection... <br/><br/></label>:
              <MDBTable btn fixed responsive>
                <MDBTableHead columns={columnsAllowance} />
                <MDBTableBody rows={allowanceList} />
              </MDBTable>}
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="0">
          <label>preview:</label>
            <MDBAnimation type="fadeInUp">
              {/* Visualización de archivo cargado */}
              <p>
                  {((activeFile).split('.')[1] !== 'pdf' &&
                      (activeFile).split('.')[1] !== undefined) &&
                      <img src={`/assets/receipt/${activeFile}`} width="100%" />}
              </p>
              {
                  ((activeFile).split('.')[1] === 'pdf') &&
                  <embed src={`/assets/receipt/${activeFile}`} width="100%" height="400px"
                      type="application/pdf"></embed>
              }
            </MDBAnimation>
          </MDBCol>
        </MDBRow>

      </div>
    </>
  )
}
