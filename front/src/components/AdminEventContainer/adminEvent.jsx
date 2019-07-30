import React from "react";
import {
  MDBIcon,
  MDBFormInline,
  MDBAnimation,
  MDBRow,
  MDBCol,
  MDBAlert
} from "mdbreact";
import RowAllowance from "../AllowancesListContainer/rowAllowance";

export default function adminEvent({
  handleFilterStatus,
  alertPending,
  eventList,
  allowanceStatus,
  deleteAllowance,
  viewDetails,
  allUser,
  urlName
}) {
  return (
    <>
    <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className="upperCaseFonts title-container">
            <span className="titleMain"><i className="fas fa-user-check"></i> EVENT ADMIN PANEL</span>

            <span className="form-inline md-form topMarginLine">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
              <select
                value={allowanceStatus}
                className="browser-default custom-select"
                name="status"
                onChange={handleFilterStatus}
              >
                <option value="">Please, select status...</option>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
            </span>
          </p>
        </MDBCol>
      </MDBRow>
      {/* LISTADO  */}
      <div>
        <hr />
        {alertPending ? (
          <>
            <div style={{ maxWidth: 406, position: "fixed", bottom: 0 }}>
              <MDBAnimation type="heartBeat">
                <MDBAlert color="success">
                  <p>
                    <strong>Hello!</strong> You have {alertPending} allowance
                    pending response...
                  </p>
                </MDBAlert>

                <hr />
              </MDBAnimation>
            </div>
          </>
        ) : (
          ""
        )}
        <MDBRow className="container-banner minHeight">
          <MDBCol md="12">
            <MDBAnimation type="fadeInUp">
              {eventList.length == 0 ? (
                <label>
                  Sorry, there aren't results for your selection... <br />
                  <br />
                </label>
              ) : (
                <div className="table-responsive">
                  <table className="table btn-table table-fixed paddingTable">
                    <thead className="">
                     
                      <tr>
                        <th>Topic</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Schelude</th>
                        <th>Status</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <RowAllowance
                      urlName={urlName}
                      deleteAllowance={deleteAllowance} // Se envia la funcion para eliminar (onClick)
                      viewDetails={viewDetails} // Se envia la funcion para mostrar el modal (onClick)
                      allUser={allUser} // Si es admin o no
                      allowanceList={eventList} // Listado de la consulta
                    />
                  </table>
                </div>
              )}
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
