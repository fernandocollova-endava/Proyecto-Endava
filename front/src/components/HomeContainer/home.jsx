import React from "react";
import { Link } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import CarouselPage from "./CarouselPage";


const AnimationPage = ({ cardList }) => {
  return (
    <>
      <MDBAnimation type="fadeInUp">
        <CarouselPage />
      </MDBAnimation>
     
      <MDBRow className="container-banner">
        <MDBCol md="1">

        </MDBCol>
        <MDBCol md="10">
          <MDBAnimation type="fadeInUp">
          <h1 className="fontLight upperCaseFonts">Benefits Management Site</h1>
            <p className="TextParrafo">
              Now you can <strong className="fontEmphasis">manage the benefits </strong>you already knew from 
              this agile and easy going 
              site. No matter where or when, you can access them from your <strong className="strongEmphasis">mobile or desktop</strong>.
                Just apply for the benefit you want by uploading a file or completing a SIMPLE 
                form and that’s it! <strong className="fontEmphasis">Enjoying</strong> all your employee benefits has never been so  <strong className="fontEmphasis">EASY</strong>!
                <br/>
                Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us.
            </p>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="1">
        </MDBCol>
      </MDBRow>

      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner marginDemo">
      <MDBCol md="3" >
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(1*100)}ms`} type='fadeInDownBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" >
                <div className="div-img" >
                  <Link to={`/allowance/new-allowance`} >
                    <div className="ajustImg">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/StockImages/Desktop/SuccessStories/Inner_650x650_SS08_02.ashx"
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
              <span className="titleModule upperCaseFonts">New Allowance</span>
              <span className="descriptionModule"> You can upload any allowance from here.</span>
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
                  <Link to={`/health-care`} >
                    <div className="ajustImg">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/InsuranceAndHealthcare/make_a_difference-inner_desktop_650x650.ashx" //{card.imgUrl}
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

              <span className="titleModule upperCaseFonts">Health Care</span>
              <span className="descriptionModule"> Get more info about your health care.</span>
            </MDBCard>
            <br />
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="3" >
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(3*100)}ms`} type='fadeInDownBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" >
                <div className="div-img" >
                  <Link to={`/calendar`} >
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

              <span className="titleModule upperCaseFonts">Event Calendar</span>
              <span className="descriptionModule">Check out every day's important events. </span>
            </MDBCard>
            <br />
          </MDBAnimation>
        </MDBCol>
         <MDBCol md="3" >
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(4*100)}ms`} type='fadeInDownBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" >
                <div className="div-img" >
                  <Link to={`/home-office`} >
                    <div className="ajustImg">
                    <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Expert-Insights/Success-Stories/Retail-Enhancing/650.ashx"
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

              <span className="titleModule upperCaseFonts">Home Office</span>
              <span className="descriptionModule"> Manage easily your home office days.</span>
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