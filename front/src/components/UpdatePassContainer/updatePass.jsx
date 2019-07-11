import React from "react";

export default function updatePass({handleChange,handleSubmit}) {

  return (
    <div>
       <div>
      <MDBContainer>
      <MDBRow>
      <MDBCol md="7">
      </MDBCol>
        <MDBCol md="5">
        <br/>
        <MDBAnimation type="fadeInLeftBig">
          <MDBCard className="transparenciaCard">
            <MDBCardBody>
            <p className="h5 text-center mb-4">LOGIN</p>
              <form onSubmit= {handleSubmit}>
                <div className="grey-text">
                <MDBInput
                    label="Type your old password"
                    icon="lock"
                    group
                    name= "Oldpassword"
                    type="password"
                    validate
                    onChange = {handleChange}
                  />
                <MDBInput
                    label="Type your new password"
                    icon="lock"
                    group
                    name= "password"
                    type="password"
                    validate
                    onChange = {handleChange}
                  />
                  <MDBInput
                    label="Repet your new password"
                    icon="lock"
                    group
                    name= "password"
                    type="password"
                    validate
                    onChange = {handleChange}
                  />
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Forgot Password?</p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      
    </div>
    </div>
  );
};
