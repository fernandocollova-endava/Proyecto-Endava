import React from "react";
import { Link } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBAnimation, MDBFormInline } from "mdbreact";

const AnimationPage = ({ cardList }) => {
  return (
    <>
      <MDBAnimation type="fadeInUp">

        {/* <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/Be-Connected/FinalImages/InnerComunities/Hero_Desktop_ICTHub.ashx"
          className="img-fluid bannerAllowance"
          alt="Imagen endava" /> */}
      </MDBAnimation>
     
      <MDBRow className="container-banner">
      <MDBCol md="12">
            <p className="title-container">
              <span className="titleMain upperCaseFonts"><i className="fas fa-tools"></i> ADMIN PANEL</span>

              <MDBFormInline className="md-form">
                {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
                
                <span className="browser-default custom-select pRequest">
                  Hello! Please choose the option you want! :)
                </span>
                
              </MDBFormInline>
            </p>



          </MDBCol>
      </MDBRow>

      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner marginDemo">
      <MDBCol md="3" >
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(4*100)}ms`} type='fadeInDownBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" >
                <div className="div-img" >
                  <Link to={`/admin/allowance`} >
                    <div className="ajustImg">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Expert-Insights/Success-Stories/Increasing-Customer-Value/480.ashx"
                      className="img-fluid margenBottomMobile img"
                      alt={`Imagen logo book`} />
                    </div>
                    <center >
                      <span 
                        className="btn-md rounded mb-0 border-0 btnModule text btnEv-red-md">
                        {/* <img src={`/assets/img/${card.name}.png`} width="30px"/> */}
                        Enter <i className="fas fa-angle-double-right"></i></span>
                    </center>
                  </Link>
                </div>
              </div>

              <span className="titleModule upperCaseFonts">General Allowance</span>
            </MDBCard>
            <br />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="3" >
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(2*100)}ms`} type='fadeInDownBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" >
                <div className="div-img" >
                  <Link to={`/admin/book`} >
                    <div className="ajustImg">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Expert-Insights/Success-Stories/Complete-Investment-Management-Insights/650.ashx"
                      className="img-fluid margenBottomMobile img"
                      alt={`Imagen logo book`} />
                    </div>
                    <center >
                      <span 
                        className="btn-md rounded mb-0 border-0 btnModule text btnEv-red-md">
                        {/* <img src={`/assets/img/${card.name}.png`} width="30px"/> */}
                        Enter <i className="fas fa-angle-double-right"></i></span>
                    </center>
                  </Link>
                </div>
              </div>

              <span className="titleModule upperCaseFonts">Admin book</span>
            </MDBCard>
            <br />
          </MDBAnimation>
        </MDBCol>
        
      </MDBRow>
      <br/><br/>
    </>
  );
};

export default AnimationPage;