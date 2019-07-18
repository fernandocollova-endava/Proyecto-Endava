import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBRow, MDBCol } from 'mdbreact';

export default function updatePass({ handleChange, handleSubmit }) {

  return (
    <div>
      <div>
        <MDBContainer>
          {/* MODAL */}
          <br /><br />
          < >
            <form onSubmit={handleSubmit}>
              <div className="grey-text">
                <h3>You must change your password before logging on the first time. </h3>
                <MDBRow>
                  <MDBCol md="1">
                  </MDBCol>
                  <MDBCol md="6">

                    <MDBInput
                      label="Your new password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      validate
                      onChange={handleChange}
                    />
                    <MDBInput
                      label="Confirm your new password"
                      icon="exclamation-triangle"
                      group
                      type="password"
                      name="passwordConfirm"
                      validate
                      error="wrong"
                      success="right"
                      onChange={handleChange}
                    />
                    <div className="text-center">
                      <MDBBtn type="submit" 
                      className="mb-3 btnEv-red rounded mb-0 border-0"
                      >Save changes</MDBBtn>
                    </div>
                  </MDBCol>
                  <MDBCol md="5">
                  
                  </MDBCol>
                </MDBRow>
              </div>
            </form>
          </>
        </MDBContainer>
      </div>
    </div>
  );
};
