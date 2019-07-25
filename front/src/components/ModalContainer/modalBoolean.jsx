import React from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

export default function ModalAviso({ modalBoolean, toggleBoolean, data , titleBoolean, actionOk }) {
    return (
        <MDBContainer>
            {/* MODAL */}
            <MDBModal isOpen={modalBoolean} toggle={toggleBoolean} size="md" >
                <MDBModalHeader toggle={toggleBoolean}>Confirm</MDBModalHeader>
                <MDBModalBody>
                <span style={({fontSize: 17})}>{titleBoolean}</span>
                <br/><br/>  
                <><span className="approved btnModalB" style={({padding: "12px 29px"})} onClick={()=>actionOk(data)}>YES</span>&nbsp;
                <span className="rejected btnModalB" style={({padding: "12px 29px"})} onClick={toggleBoolean}>NO</span>
                <br/><br/>
                </>
            </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    );
}