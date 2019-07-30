import React from 'react';
import { Link } from 'react-router-dom'
import {
    MDBCollapse, MDBBtn, MDBAnimation, MDBContainer, MDBCol, MDBCardBody, MDBCardTitle,
    MDBCardText, MDBCard, MDBCardImage, MDBRow, MDBInput, MDBFormInline
} from 'mdbreact';

export default function obraSocial({ toggleCollapse, collapseID, email, formId, handleScrollToForm, onFormSubmit, onEmailChange, onhealthOptionChange, onObservationChange }) {
    return (
        <>
            <MDBContainer fluid>
                <MDBRow className="container-banner">
                    <MDBCol md="12">
                        <p className="upperCaseFonts title-container-fluid">
                            <span className="titleMain"><i className="fas fa-briefcase-medical"></i> HEALTH CARE</span>

                            <span className="form-inline md-form topMarginLine">
                                {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}

                                <button className="browser-default custom-select newRequest"
                                    onClick={handleScrollToForm}>
                                    <i className="fab fa-wpforms"></i> Go to the form
                                </button>
                            </span>
                        </p>
                    </MDBCol>
                </MDBRow>
                <br />
                <h3 className="upperCaseFonts">Find a health care plan built specially for you.</h3>
                <span className="marginTextLeft" > Have the solutions on hand to manager health priorities. A health plan made for you and your requirements. </span> <br /><br />
                <MDBAnimation type="fadeInUp">
                    <MDBRow>
                        <MDBCol md="1"></MDBCol>
                        <MDBCol md="5">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="4"><MDBCardImage className="img-fluid img-fluid z-depth-1"
                                            src="/assets/img/osde.png" waves /></MDBCol>

                                        <MDBCol md="8">
                                            <MDBCardTitle>OSDE</MDBCardTitle>
                                            <MDBCardText>
                                                Some quick example text to build on the card title and make
                                                up the bulk of the card&apos;s content.
                                        </MDBCardText>
                                            <MDBBtn onClick={() => toggleCollapse("leftCollapse")}>More..</MDBBtn>
                                        </MDBCol><hr />
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
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="5">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="4"><MDBCardImage className="img-fluid img-fluid z-depth-1"
                                            src="/assets/img/swiss.png" waves /></MDBCol>
                                        <MDBCol md="8">
                                            <MDBCardTitle>SWISS MEDICAL</MDBCardTitle>
                                            <MDBCardText>
                                                Some quick example text to build on the card title and make.
                                        </MDBCardText>
                                            <MDBBtn onClick={() => toggleCollapse("rightCollapse")}>More..</MDBBtn>
                                        </MDBCol><hr />
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

                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="1"></MDBCol>
                    </MDBRow>
                    <hr />


                </MDBAnimation>
                <hr />

                <MDBAnimation type="fadeInLeft">
                    <MDBRow>
                        <MDBCol md="8" ref={formId}>
                            <strong > Send us your question</strong> <br />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque odio enim ducimus blanditiis nulla reprehenderit ea nesciunt, ratione porro, tempora quas? Provident reprehenderit fuga numquam odit perspiciatis soluta, ipsum omnis?
                            <br />
                            <br />
                            <MDBCol md="7">
                                <MDBCard>
                                    <form onSubmit={onFormSubmit}>
                                        <br />
                                        <div className="grey-text">

                                            <select className="browser-default custom-select" onChange={onhealthOptionChange} name = "healthOption">
                                                <option>Choose a subject...</option>
                                                <option value="Swiss Medical">Swiss Medical</option>
                                                <option value="OSDE">OSDE</option>
                                            </select>
                                            <hr />

                                            <MDBInput
                                           
                                                label="Your emails"
                                                icon="envelope"
                                                group
                                                name= "email"
                                                type="email"
                                                // value={email}
                                                error="wrong"
                                                success="right"
                                                onChange={onEmailChange}
                                            />

                                            <MDBInput
                                                name="observation"
                                                type="textarea"
                                                rows="2"
                                                label="I need more information..."
                                                icon="pencil-alt"
                                                onChange={onObservationChange}
                                                
                                            />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn outline className="mb-3 btnEv-blue rounded mb-0 border-0 whiteFont" type="submit">
                                                Send
                                            </MDBBtn>

                                        </div>
                                    </form>
                                </MDBCard>
                            </MDBCol>
                        </MDBCol>
                        <MDBCol md="4">
                            <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/InsuranceAndHealthcare/make_a_difference-inner_desktop_650x650.ashx" width="100%" />
                        </MDBCol>
                    </MDBRow>
                </MDBAnimation>
            </MDBContainer>
            <br /><br />
        </>
    );
}