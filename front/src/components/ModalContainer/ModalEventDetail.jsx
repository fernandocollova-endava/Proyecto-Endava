import React from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
    MDBNavLink, MDBNavItem, MDBTabContent, MDBTabPane, MDBNav, MDBAnimation
} from 'mdbreact';

export default function ModalEventDetails({ modal, msjSave, allUser, handleSaveConfirm, toggleDetails, activeEvent, history, togglePanel, activeItem }) {
    return (
        <MDBContainer>
            {/* MODAL */}
            <MDBModal isOpen={modal} toggle={toggleDetails} size="lg">
                <MDBModalHeader toggle={toggleDetails}>
                    <label className="upperCaseFonts">{activeEvent.topic}</label>
                </MDBModalHeader>
                <MDBModalBody>
                    <MDBNav className="nav-tabs">
                        <MDBNavItem>
                            <MDBNavLink to="#" className={activeItem === "1" ? "active" : ""} onClick={() => togglePanel("1")} role="tab" >
                                <i className="far fa-list-alt"></i> <strong>DETAILS</strong>
                            </MDBNavLink>
                        </MDBNavItem>
                      
                    </MDBNav>
                    <MDBTabContent activeItem={activeItem} >
                        <MDBTabPane tabId="1" role="tabpanel">
                            <div className="mt-2">
                                <p>
                                    {/* <strong className="textBold">User: </strong><span className="textForm">{activeEvent.employeeDetail.name}</span> */}
                                   
                                </p>
                                <p className="parrafoModal">
                                    
                                    <strong className="textBold">Employee: </strong><span className="textForm"> { activeEvent.employee && activeEvent.employee.name}</span>
                                    <strong className="marginTextLeft textBold">Topic: </strong><span className="textForm"> {activeEvent.topic}</span>
                                    
                                </p>
                                <p className="parrafoModal">
                                    <strong className="textBold">Time schelude: </strong><span className="textForm"> {activeEvent.time}</span>
                                    <strong className="marginTextLeft textBold">Status: </strong><span className={`textForm ${activeEvent.status}`}>{activeEvent.status}</span>
                                </p>
                                <p className="parrafoModal"><strong className="textBold">Observation: </strong><span className="textForm">{activeEvent.description}</span></p>
                                <p className="parrafoModal"><strong className="textBold">Admin Comment: </strong><span className="textForm">{activeEvent.adminComment}</span></p>
                                <form onSubmit={handleSaveConfirm}>
                                    <input type="hidden" name="id" value={activeEvent.id} /> {/* Contiene id del detalle actual */}
                                    <span action="" className="modalForm">
                                        {(activeEvent.status === 'pending') ?
                                            <div className="radio">
                                                <label className="approvedBook radioBoton">
                                                    <input type="radio" defaultChecked={(activeEvent.status === 'approved')} name="status" value="approved" />
                                                    &nbsp;APPROVED</label>
                                                <label className="rejectedBook radioBoton">
                                                    <input type="radio" defaultChecked={(activeEvent.status === 'rejected')} name="status" value="rejected" />
                                                    &nbsp;REJECTED</label>
                                            </div> :
                                            <>
                                                <strong className="textBold">Status: </strong><span className={`textForm ${activeEvent.status}`}>{activeEvent.status}</span>
                                                <br /><br /><br />
                                            </>}
                                    </span>
                                    <div className="input-group" style={({ marginTop: -20 })}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                <i className="far fa-comment-alt prefix"></i>
                                            </span>
                                        </div>
                                        <input type="text" autoComplete="off" name="observation" defaultValue={activeEvent.adminComment} required className="form-control" placeholder="Observation..." aria-describedby="basic-addon" />
                                    </div>
                                    {(activeEvent.status === 'pending') && <>
                                        <br />
                                        <button type="submit" className="mb-3 btnEv-blue rounded mb-0 border-0" ><i className="fas fa-edit"></i> Save</button>
                                        <p><strong>{msjSave}</strong></p>
                                    </>}

                                </form>
                                <hr />
                        
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