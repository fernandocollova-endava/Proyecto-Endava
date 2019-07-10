import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


export default function ModalForm({modal14, toggle}) {    
    return (
        <MDBModal isOpen={modal14} toggle={toggle(14)} centered>
            <MDBModalHeader toggle={toggle(14)}>MDBModal title</MDBModalHeader>
            <MDBModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={()=>toggle(14)}>Close</MDBBtn>
                <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
}
