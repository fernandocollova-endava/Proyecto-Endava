import React from 'react'
import {MDBIcon, MDBFormInline, MDBAnimation, MDBRow, MDBCol, MDBAlert} from "mdbreact";
import RowAllowance from "../AllowancesListContainer/rowAllowance"

import { columnsBook } from '../../auxFunctions/auxFunctions'

export default function adminBook({

  handleFilterStatus,
  alertPending,
  bookAllowances,
  allowanceStatus,
  deleteAllowance,
  viewDetails,
  allUser,
  urlName
}) {
  return (
    <>
      {/* LISTADO  */
      
     }
      <div>
        <MDBRow className="container-banner">
          <MDBCol md="2">
            <h1 className="upperCaseFonts">Requests</h1>
          </MDBCol>
          <MDBCol md="5">
            <MDBFormInline className="md-form">
              <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp;
              
              <select  value={allowanceStatus} className="browser-default custom-select" name="status" onChange={handleFilterStatus}>
                <option value="">Status...</option>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>                
              </select>
            </MDBFormInline>
            
          </MDBCol>
          <MDBCol md="2">

          </MDBCol>
          <MDBCol md="3">
            <MDBFormInline className="md-form">
              <MDBIcon icon="search" />
              <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
            </MDBFormInline>
          </MDBCol>
        </MDBRow>

        <hr />
        { (alertPending)?<>
        <div style={({maxWidth:406, position: "fixed", bottom: 0})}>
          <MDBAnimation type="heartBeat">
          <MDBAlert color="success" >
            <p>
              <strong>Hello!</strong> You have {alertPending} allowance pending response...
            </p>            
          </MDBAlert>
          
        <hr/>
        </MDBAnimation>
        </div>
        </> :''}
        <MDBRow className="container-banner minHeight">
         
          <MDBCol md="12">
            <MDBAnimation type="fadeInUp">
            {(bookAllowances.length == 0) ? <label>Sorry, there aren't results for your selection... <br /><br /></label> :
                 
             
                <div class="table-responsive">
                 
                  <table class="table btn-table table-fixed paddingTable">
                    <thead class="">
                    {/* {console.log("entreeee", bookAllowances)} */}
                    {(urlName == "book")?
                     
                      <tr>
                       
                        <th>Type</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Limit</th>
                        <th>Emp. Amount</th>
                        <th>Status</th>
                        <th>Info</th>
                        <th>Option</th>
                      </tr>:
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
                    }
                    </thead>
                    <RowAllowance
                      
                      urlName = {urlName}
                      deleteAllowance={deleteAllowance} // Se envia la funcion para eliminar (onClick)
                      viewDetails={viewDetails}  // Se envia la funcion para mostrar el modal (onClick)
                      allUser={allUser} // Si es admin o no
                      allowanceList={bookAllowances} // Listado de la consulta
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
