import React from 'react';
import { MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

export default function Profile({ user, handClick }) {
  return (
    <MDBRow className="container-banner">
    
      <MDBCol md="1">

      </MDBCol>
      <MDBCol md="8" >
      Profile:
        <MDBCard>
          <MDBCardBody>
            <MDBRow className="container-banner">
              <MDBCol md="3">
                <div className="imgProfile">
                  <MDBCardImage className="img-fluid z-depth-3 imgStyle" src={`/assets/img/profile/${user.avatar}`} waves />
                </div>
                <span className="iconEditImg">
                <i class="far fa-edit"></i>
                </span>
              </MDBCol>
              <MDBCol md="9" >
                <MDBCardTitle><h3> {user.name} {user.surname}</h3></MDBCardTitle>
                <h5>Sector: {user.sector}</h5>
                <MDBCardText>
                  Some quick example text to build on the card title and make
                  up the bulk of the card&apos;s content.
                </MDBCardText>
                <MDBBtn className="mb-3 btnEv-blue rounded mb-0 border-0" onClick={handClick}>Edit</MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </MDBRow>
  )
}