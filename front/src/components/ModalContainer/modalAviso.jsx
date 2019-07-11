import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default function ModalAviso({ modal, toggle, textMsj, titleMsj }) {
    return (
        <MDBContainer>
            {/* MODAL */}
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>{titleMsj}</MDBModalHeader>
                <MDBModalBody>
                    {textMsj}
            </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}