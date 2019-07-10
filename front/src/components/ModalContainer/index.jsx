import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class ModalPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this) 
    }

  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <MDBContainer>
        {/* BUTTON */}
        <MDBBtn color="info" onClick={this.toggle}>Click</MDBBtn>
        {/* MODAL */}
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}    >
          <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
          <form>
            <div className="grey-text">
              
            <MDBInput
                label="Your current password "
                icon="lock"
                group
                type="password"
                validate
              />
              <MDBInput
                label="Your new password"
                icon="lock"
                group
                type="password"
                validate
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
              
            </div>
            <div className="text-center">
            <MDBBtn color="primary">Save changes</MDBBtn>
            </div>
          </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default ModalPage;