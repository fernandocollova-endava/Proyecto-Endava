import React from 'react';
import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBTableHead,
    MDBNavLink, MDBNavItem, MDBTabContent, MDBTabPane, MDBNav, MDBTable, MDBTableBody, MDBAnimation
} from 'mdbreact';
import { columnsAllowanceDetail } from '../../auxFunctions/auxFunctions'

export default function ModalDetails({ modal, toggleDetails, activeAllowance, history, togglePanel, activeItem }) {
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
                                Details
                        </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" className={activeItem === "2" ? "active" : ""} onClick={() => togglePanel("2")} role="tab" >
                                History
                        </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" className={activeItem === "3" ? "active" : ""} onClick={() => togglePanel("3")} role="tab" >
                                Admin
                        </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={activeItem} >
                        <MDBTabPane tabId="1" role="tabpanel">
                            <p className="mt-2">
                            <p>
                                <strong className="textBold">User: </strong><span className="textForm">{activeAllowance.employeeDetail.name}</span>
                                <strong className="marginTextLeft textBold">Payment Date: </strong><span className="textForm">{activeAllowance.paymentDate}</span>
                            </p>
                            <p className="parrafoModal">
                                <strong className="textBold">Amount: </strong><span className="textForm">$ {activeAllowance.amount}</span>
                                <strong className="marginTextLeft textBold">Status: </strong><span className={`textForm ${activeAllowance.status}`}>{activeAllowance.status}</span>
                            </p>
                            <p className="parrafoModal"><strong className="textBold">Observation: </strong><span className="textForm">{activeAllowance.observation}</span></p>
                            <p className="parrafoModal"><strong className="textBold">Admin Comment: </strong><span className="textForm">{activeAllowance.adminComment}</span></p>
                            
                            <hr/>
                            {/* Visualización de archivo cargado */}
                            
                                {((activeAllowance.receiptPath).split('.')[1] !== 'pdf' &&
                                (activeAllowance.receiptPath).split('.')[1] !== undefined) &&
                                <img src={`/assets/receipt/${activeAllowance.receiptPath}`} width="100%" />}
                            {
                                ((activeAllowance.receiptPath).split('.')[1] === 'pdf') &&
                                <embed src={`/assets/receipt/${activeAllowance.receiptPath}`} width="100%" height="400px"
                                type="application/pdf"></embed>
                            }
                            </p>
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                            <p className="mt-2">
                            <MDBAnimation type="fadeInUp">
                                <MDBTable btn fixed responsive>
                                <MDBTableHead columns={columnsAllowanceDetail} />
                                <MDBTableBody rows={history} />
                                </MDBTable>
                            </MDBAnimation>
                            </p>

                        </MDBTabPane>
                        <MDBTabPane tabId="3" role="tabpanel">
                            <p className="mt-2">
                            ADMIN
                            </p>
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