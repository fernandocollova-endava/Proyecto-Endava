import React from "react";
import { Link } from "react-router-dom"
import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

export default function Profile({ user, avatar, handClick, handleImageChange }) {
  return (
    <>
      <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className="title-container">
            <span className="titleMain upperCaseFonts"><i className="fas fa-user-circle"></i> My profile</span>


            <span className="form-inline md-form topMarginLine">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}

              <span className="browser-default custom-select pRequest">
              </span>
              <Link className="browser-default custom-select newRequest"
                to="/">
                <i className="fas fa-home"></i> Home
              </Link>

            </span>
          </p>
        </MDBCol>
      </MDBRow>
      <br />
      <MDBRow className="container-banner">

        <MDBCol md="9">
          Profile:
        <MDBCard>
            <MDBCardBody>
              <MDBRow className="container-banner">
                <MDBCol md="3">
                  <div className="imgProfile">
                    <MDBCardImage
                      className="img-fluid z-depth-3 imgStyle"
                      src={`/assets/img/profile/${avatar}`}
                      waves
                    />
                  </div>

                  <span
                    className="iconEditImg"
                    onClick={handleImageChange}
                    type="file"
                  >
                    <i className="far fa-images"></i>
                  </span>
                </MDBCol>
                <MDBCol md="9">
                  <MDBCardTitle>
                    <span style={({ fontSize: 30 })}>
                      {" "}
                      {user.name} {user.surname}
                    </span>
                  </MDBCardTitle>
                  <span style={({ fontSize: 20 })}>Sector: {user.sector}</span>
                  <MDBCardText>
                    Some quick example text to build on the card title and make up
                    the bulk of the card&apos;s content.
                </MDBCardText>
                  <MDBBtn
                    className="mb-3 btnEv-blue rounded mb-0 border-0"
                    onClick={handClick}
                  >
                    <i className="fas fa-key"></i> Change password
                </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </>
  );
}
