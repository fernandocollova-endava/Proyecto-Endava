import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";


const AnimationPage = () =>  {

  let count = 0;

  const increment = () => {
    count++;
    if (count < 6 || count % 5 === 0) {
      // console.log(`The MDB logo bounced ${count} times.`);
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="4">
          <img src="https://careers.endava.com/en/-/media/EndavaDigital/Careers/Images/MeetEndava/02_MeetEndava_480x500.ashx"
               className="img-fluid" 
               alt="Imagen endava"/>
        </MDBCol>
        <MDBCol md="8">
          <h1>ENDAVA STORY</h1>
          <p>
            We began our journey as a consulting firm delivering real transformation through IT strategy and architecture services for some of the world’s largest banks and payments companies.
            Over the past 18 years, we marked important milestones towards becoming global through opening delivery centres and offices in North and Latin America, as well as Western and Central Europe. 
            Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us, and the people who use the systems and applications we design, build, and operate.
          </p>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4" style={{ marginTop: "1vh" }}>
        <MDBCol md="4">
          <MDBAnimation reveal type="bounceInUp">
            <img
              alt="A view on mountains."
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(31).jpg"
            />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="4">
          <MDBAnimation reveal type="tada">
            <img
              alt="Cottage on a lake surrounded by mountains."
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(32).jpg"
            />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="4">
          <MDBAnimation reveal type="fadeInLeft">
            <img
              alt="A boat floating on an ocean"
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg"
            />
          </MDBAnimation>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol md="4">
          <MDBAnimation reveal type="fadeInRight">
            <img
              alt="View on mountains from mountain top."
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
            />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="4">
          <MDBAnimation reveal type="fadeInRight">
            <img
              alt="Rocky shore in the morning."
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(14).jpg"
            />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="4">
          <MDBAnimation
            reveal
            type="fadeInUp"
            onAnimationEnd={() =>
              console.log("The last picture has been revealed")
            }
          >
            <img
              alt="Rocky shore in the morning."
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
            />
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AnimationPage;
