import React from 'react';
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

export default function Profile({ user, handClick }) {
  return (
    <MDBRow className="container-banner">
      <MDBCol md="1">

      </MDBCol>
      <MDBCol md="8" >
        <MDBCard>
          <MDBCardBody>
            <MDBRow className="container-banner">
              <MDBCol md="4">
                <div className="imgProfile">
                  <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                </div>
                <span className="iconEditImg">
                  hola
                </span>
              </MDBCol>
              <MDBCol md="8" >
                <MDBCardTitle><h3> {user.name} {user.surname}</h3></MDBCardTitle>
                <h5>Sector: {user.sector}</h5>
                <MDBCardText>
                  Some quick example text to build on the card title and make
                  up the bulk of the card&apos;s content.
                </MDBCardText>
                <MDBBtn onClick={handClick}>Edit</MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}