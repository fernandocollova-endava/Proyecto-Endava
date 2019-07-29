import React from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
    MDBNavLink, MDBNavItem, MDBTabContent, MDBTabPane, MDBNav, MDBAnimation
} from 'mdbreact';

export default function ModalDetails({ modal, msjSave, allUser, handleSaveConfirm, toggleDetails, activeAllowance, history, togglePanel, activeItem }) {
    return (
        <MDBContainer>
            {/* MODAL */}
            <MDBModal isOpen={modal} toggle={toggleDetails} size="lg">
                <MDBModalHeader toggle={toggleDetails}>
                    <label className="upperCaseFonts">{activeAllowance.allowanceDetail.name}</label>
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBNav className="nav-tabs">
                        <MDBNavItem>
                            <MDBNavLink to="#" className={activeItem === "1" ? "active" : ""} onClick={() => togglePanel("1")} role="tab" >
                                <i className="far fa-list-alt"></i> <strong>DETAILS</strong>
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" className={activeItem === "2" ? "active" : ""} onClick={() => togglePanel("2")} role="tab" >
                                <i className="fas fa-history"></i> <strong>HISTORY</strong>
                            </MDBNavLink>
                        </MDBNavItem>
                        {
                            (allUser) && // Si 
                            <MDBNavItem>
                                <MDBNavLink to="#" className={activeItem === "3" ? "active" : ""} onClick={() => togglePanel("3")} role="tab" >
                                    <i className="fas fa-user-edit"></i> <strong>ADMIN</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                        }

                    </MDBNav>
                    <MDBTabContent activeItem={activeItem} >
                        <MDBTabPane tabId="1" role="tabpanel">
                            <div className="mt-2">
                                <p>
                                    <strong className="textBold">User: </strong><span className="textForm">{activeAllowance.employeeDetail.name}</span>
                                    <strong className="marginTextLeft textBold">Actual payment date: </strong><span className="textForm">{activeAllowance.paymentDate}</span>
                                </p>
                                <p className="parrafoModal">
                                    <strong className="textBold">Amount: </strong><span className="textForm">$ {activeAllowance.amount}</span>
                                    <strong className="marginTextLeft textBold">Status: </strong><span className={`textForm ${activeAllowance.status}`}>{activeAllowance.status}</span>
                                </p>
                                <p className="parrafoModal"><strong className="textBold">Observation: </strong><span className="textForm">{activeAllowance.observation}</span></p>
                                <p className="parrafoModal"><strong className="textBold">Admin Comment: </strong><span className="textForm">{activeAllowance.adminComment}</span></p>

                                <hr />
                                {/* Visualización de archivo cargado */}

                                {((activeAllowance.receiptPath).split('.')[1] !== 'pdf' &&
                                    (activeAllowance.receiptPath).split('.')[1] !== undefined) &&
                                    <img src={`/assets/receipt/${activeAllowance.receiptPath}`} width="100%" />}
                                {
                                    ((activeAllowance.receiptPath).split('.')[1] === 'pdf') &&
                                    <embed src={`/assets/receipt/${activeAllowance.receiptPath}`} width="100%" height="400px"
                                        type="application/pdf"></embed>
                                }
                            </div>
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                            <div className="mt-2">
                                <MDBAnimation type="fadeInUp">
                                    <div className="table-responsive">
                                        <table className="table btn-table table-fixed">
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Installments</th>
                                                <th>Limit</th>
                                                <th>Emp. Amount</th>
                                                <th>Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {history&&history.map((item,i)=>(
                                                    <tr style={({height: 32})} key={i}>
                                                        <td>{item.paymentDate}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.installments}</td>
                                                        <td>{item.limitAmount}</td>
                                                        <td>{item.employeeAmount}</td>
                                                        <td className={item.status}>{item.status}</td>
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </MDBAnimation>
                            </div>

                        </MDBTabPane>
                        <MDBTabPane tabId="3" role="tabpanel">
                            <div className="mt-2">
                                <p>
                                    Please select the state to modify: <br />
                                    User: {activeAllowance.employeeDetail.name}
                                </p>
                                <form onSubmit={handleSaveConfirm}>
                                    <input type="hidden" name="id" value={activeAllowance.id} /> {/* Contiene id del detalle actual */}
                                    <span action="" className="modalForm">
                                        {(activeAllowance.status === 'pending') ?
                                            <div className="radio">
                                                <label className="approved radioBoton">
                                                    <input type="radio" defaultChecked={(activeAllowance.status === 'approved')} name="status" value="approved" />
                                                    &nbsp;APPROVED</label>
                                                <label className="rejected radioBoton">
                                                    <input type="radio" defaultChecked={(activeAllowance.status === 'rejected')} name="status" value="rejected" />
                                                    &nbsp;REJECTED</label>
                                            </div> :
                                            <>
                                                <strong className="textBold">Status: </strong><span className={`textForm ${activeAllowance.status}`}>{activeAllowance.status}</span>
                                                <br /><br /><br />
                                            </>}
                                    </span>
                                    <div className="input-group" style={({ marginTop: -20 })}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                <i className="far fa-comment-alt prefix"></i>
                                            </span>
                                        </div>
                                        <input type="text" autoComplete="off" name="observation" defaultValue={activeAllowance.adminComment} required className="form-control" placeholder="Observation..." aria-describedby="basic-addon" />
                                    </div>
                                    {(activeAllowance.status === 'pending') && <>
                                        <br />
                                        <button type="submit" className="mb-3 btnEv-blue rounded mb-0 border-0" ><i className="fas fa-edit"></i> Save</button>
                                        <p><strong>{msjSave}</strong></p>
                                    </>}

                                </form>
                            </div>
                        </MDBTabPane>
                    </MDBTabContent>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn className="mb-3 btnEv-red rounded mb-0 border-0" onClick={toggleDetails}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}