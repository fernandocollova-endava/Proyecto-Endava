import React from "react";
import { Link } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBAnimation } from "mdbreact";


const AnimationPage = ({ cardList }) => {
  return (
    <>
      <MDBAnimation type="fadeInUp">
        <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/Be-Connected/FinalImages/InnerComunities/Hero_Desktop_ICTHub.ashx"
          className="img-fluid bannerAllowance"
          alt="Imagen endava" />
      </MDBAnimation>

      <MDBRow className="container-banner">
        <MDBCol md="1">

        </MDBCol>
        <MDBCol md="8">
          <h1>Welcome to the allowance employee</h1>
          <MDBAnimation type="fadeInUp">
            <p className="TextParrafo">
              We began our journey as a consulting firm delivering real transformation through IT strategy and architecture services for some of the world’s largest banks and payments companies.
              Over the past 18 years, we marked important milestones towards becoming global through opening delivery centres and offices in North and Latin America, as well as Western and Central Europe.
              Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us, and the people who use the systems and applications we design, build, and operate.
            </p>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="1">

        </MDBCol>

      </MDBRow>

      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner marginDemo">
        {
          cardList && cardList.map((card, i) => (
            <MDBCol md="3">
              <MDBAnimation reveal type={((i % 2 == 0) ? 'fadeInUp' : 'fadeInDown')}>
                <MDBCard className="Card-Img">
                  <div className="container-IMG">
                    <div className="div-img" >
                      <Link to={`/allowance/${card.name}`} >
                        <img src={card.imgUrl}
                          className="img-fluid margenBottomMobile img"
                          alt={`Imagen logo ${card.name}`} />
                        <center>
                          <span
                            className="btn-md rounded mb-0 border-0 btnModule text btnEv-red-md">
                            Ingresar <i className="fas fa-angle-double-right"></i></span>
                        </center>
                      </Link>
                    </div>
                  </div>

                  <span className="titleModule">{card.completeName}</span>
                </MDBCard>
                <br />
              </MDBAnimation>
            </MDBCol>
          ))
        }
      </MDBRow>
    </>
  );
};

export default AnimationPage;