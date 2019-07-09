import React from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBAnimation } from "mdbreact";


const AnimationPage = () => {

  return (
    <>
      <MDBRow className="container-banner">
        <MDBCol md="3">
          <MDBAnimation type="flipInY">
            <img src="https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx"
              className="img-fluid margenBottomMobile"
              alt="Imagen endava" />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="8">
          <h1>Welcome to the allowence empleyee</h1>
          <MDBAnimation type="fadeInDown">
            <p>
              We began our journey as a consulting firm delivering real transformation through IT strategy and architecture services for some of the world’s largest banks and payments companies.
              Over the past 18 years, we marked important milestones towards becoming global through opening delivery centres and offices in North and Latin America, as well as Western and Central Europe.
              Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us, and the people who use the systems and applications we design, build, and operate.
          </p>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
      <br />
      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner">
        <MDBCol md="3">
          <MDBAnimation type="fadeInUp">
            <MDBCard className="Card-Img">
              <div className="container-IMG">
                <div className="div-img" >
                  <img src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/ServicesInnerPages/Smart-Automation/Smart-Automation-Whitepaper/AutomationWP_V2_Hero_Mobile_480x500.ashx"
                    className="img-fluid margenBottomMobile img"
                    alt="Imagen endava" />
                  <div className="text">That's all folks!</div>
                </div>
              </div>
              <a href="" className="btn btn-default btnModule">Ingresar</a><br/>
              <span className="titleModule">Gym Allowance</span>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>

        {/* FICHAS 2 */}
      
        <MDBCol md="3">
          <MDBAnimation type="fadeInDown">
            <MDBCard className="Card-Img">
              <div className="container-IMG">
                <div className="div-img" >
                  <img src="https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/05_MeetEndava_480x500.ashx"
                    className="img-fluid margenBottomMobile img"
                    alt="Imagen endava" />
                  <div className="text">That's all folks!</div>
                </div>
              </div>
              <a href="" className="btn btn-default btnModule">Ingresar</a><br/>
              <span className="titleModule">Trainning Allowance</span>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="3">
          <MDBAnimation type="fadeInUp" onAnimationEnd={() =>
            console.log("The last picture has beened")
          }>
            <img src="https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx"
              className="img-fluid margenBottomMobile"
              alt="Imagen endava" />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="3">
          <MDBAnimation type="fadeInUp" onAnimationEnd={() =>
            console.log("The last picture has beened")
          }>
            <img src="https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx"
              className="img-fluid margenBottomMobile"
              alt="Imagen endava" />
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
      <br />
      <br />
    </>

  );
};

export default AnimationPage;
