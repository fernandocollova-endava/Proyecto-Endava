import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

export default function Profile({user, handClick}) {
  return (
    <MDBCol>
      {/* {console.log("soy user", user)} */}
      <MDBCard style={{ width: "22rem" }}>
        <div className="imgProfile">
          <MDBCardImage className="img-fluid " src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        </div>
        <span className="iconEditImg">
          hola
        </span>
        
        <MDBCardBody>
          <MDBCardTitle><h3> {user.name} {user.surname}</h3></MDBCardTitle>
          <h5>Sector: {user.sector}</h5>
          <MDBCardText>
            Some quick example text to build on the card title and make
            up the bulk of the card&apos;s content.
          </MDBCardText>
          <MDBBtn onClick={handClick}>Edit</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

