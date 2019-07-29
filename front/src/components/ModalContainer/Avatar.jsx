import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from "mdbreact";

export default function ModalAvatar({ modalAvatar, toggleModalAvatar, handleSubmitAvatar, onChange }) {
  return (
    <MDBContainer>
      {/* MODAL */}
      <MDBModal isOpen={modalAvatar} toggle={toggleModalAvatar}>
        <MDBModalHeader toggle={toggleModalAvatar}>
          <label>
            <span className="tittleModalUser">
            <MDBIcon far icon="address-card" /> My Profile
            </span>
          </label>
          <br />
        </MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={handleSubmitAvatar} /*Envio a data a updatear*/ >
            <label>Please, Change your new image</label>
            <MDBInput
                        icon="file-signature"
                        group
                        type="file"
                        name="file"
                        onChange={onChange}
                        required
                        validate
                        error="wrong"
                        success="right"
                      />
            <MDBBtn
              color="light-blue"
              className="mb-3 btnEv-red rounded mb-0 border-0"
              type="submit"
              onClick={toggleModalAvatar}  //llamo al boton de cierre de ese modal, a la vez que confirmo el submit
            >
              Upload
            </MDBBtn>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModalAvatar}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
