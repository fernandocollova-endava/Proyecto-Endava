import React from 'react';
import {
    MDBCollapse, MDBBtn, MDBAnimation, MDBContainer, MDBCol, MDBCardBody, MDBCardTitle,
    MDBCardText, MDBCard, MDBCardImage, MDBRow, MDBInput
} from 'mdbreact';

export default function obraSocial({ toggleCollapse, collapseID, user, email }) {
    return (
        <>
        <MDBContainer fluid>
        <h3 className="upperCaseFonts">Find a health care plan built specially for you.</h3>
            <span className="marginTextLeft" > Have the solutions on hand to manager health priorities. A health plan made for you and your requirements. </span> <br/><br/>
            <MDBAnimation type="fadeInUp">
                <MDBRow>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="4"><MDBCardImage className="img-fluid img-fluid z-depth-2" src="https://www.telediariodigital.net/wp-content/uploads/2013/10/OSDE.jpg" waves /></MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardTitle>OSDE</MDBCardTitle>
                                        <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                                        </MDBCardText>
                                        <MDBBtn onClick={() => toggleCollapse("leftCollapse")}>More..</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="4"><MDBCardImage className="img-fluid img-fluid z-depth-1" src="https://www.gmkfreelogos.com/logos/S/img/swiss_medical.gif" waves /></MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardTitle>SWISS MEDICAL</MDBCardTitle>
                                        <MDBCardText>
                                        Some quick example text to build on the card title and make.
                                        </MDBCardText>
                                        <MDBBtn onClick={() => toggleCollapse("rightCollapse")}>More..</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                </MDBRow>
                <hr/>
                <MDBCollapse id="leftCollapse" isOpen={collapseID}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </MDBCollapse>
                <MDBCollapse id="rightCollapse" isOpen={collapseID}>
                    <p>
                        hola
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </MDBCollapse>
            </MDBAnimation>
                <hr />
                
                <MDBRow>
                    <MDBCol md="2">
                    <MDBBtn
                    onClick={() => toggleCollapse("sendForm")}
                    style={{ marginBottom: "1rem" }}
                    className="mb-3 btnEv-red rounded mb-0 border-0"
                >
                    Send form
                    </MDBBtn>
                    </MDBCol>
                    <MDBCol md="4">
                    <MDBCollapse id="sendForm" isOpen={collapseID}>
                    <p>
                        <form>
                            <p className="h5 text-center mb-4">Write to us</p>
                            <div className="grey-text">
                            <MDBInput
                                readOnly
                                label="Your name"
                                icon="user"
                                group
                                type="text"
                                value={user}
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                readOnly
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                value={email}
                                error="wrong"
                                success="right"
                            />
                            
                            <MDBInput
                                type="textarea"
                                rows="2"
                                label="Your message"
                                icon="pencil-alt"
                            />
                            </div>
                            <div className="text-center">
                            <MDBBtn outline className="mb-3 btnEv-blue rounded mb-0 border-0" style={({color:"white"})}>
                                Send 
                            </MDBBtn>
                            </div>
                        </form>
                    </p>
                    </MDBCollapse>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}