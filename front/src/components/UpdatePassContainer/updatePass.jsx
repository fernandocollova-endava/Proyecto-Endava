import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default function updatePass({handleChange,handleSubmit}) {

  return (
    <div>
       <div>
       <MDBContainer>
        {/* BUTTON */}
        <MDBBtn color="info" onClick={this.toggle}>Click</MDBBtn>
        {/* MODAL */}
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}    >
          <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
          <form onSubmit= {handleSubmit}>
            <div className="grey-text">
              
            <MDBInput
                label="Your current password "
                icon="lock"
                group
                type="password"
                validate
                onChange = {handleChange}
              />
              <MDBInput
                label="Your new password"
                icon="lock"
                group
                type="password"
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
                onChange = {handleChange}
              />
            </div>
            <div className="text-center">
            <MDBBtn  type="submit" color="primary">Save changes</MDBBtn>
            </div>
          </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      
    </div>
    </div>
  );
};
