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
      <div></div>
    );
  }
}
export default ModalPage;