import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBRow, MDBCol} from 'mdbreact';

export default function updatePass({ handleChange,handleSubmit}) {

  return (
    <div>
       <div>
         
       <MDBContainer>
        {/* MODAL */}
    <br/><br/>
          < >
          <form onSubmit= {handleSubmit}>
            <div className="grey-text">
              <h3>You must change your password before logging on the first time. </h3>
              <MDBRow>
                
               <MDBCol md="4">  
               </MDBCol> 
            <MDBInput
                label="Your current password "
                icon="lock"
                group
                type="password"
                name = "oldPassword"
                validate
                onChange = {handleChange}
              />
              <MDBInput
                label="Your new password"
                icon="lock"
                group
                type="password"
                name="password"
                validate
                onChange = {handleChange}
              />
              <MDBInput
                label="Confirm your new password"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
            </MDBRow>
            </div>
            <div className="text-center">
            <MDBBtn  type="submit" color="primary">Save changes</MDBBtn>
            </div>
          </form>
          </>
            <MDBBtn color="secondary" >Close</MDBBtn>

      </MDBContainer>
      
    </div>
    </div>
  );
};
