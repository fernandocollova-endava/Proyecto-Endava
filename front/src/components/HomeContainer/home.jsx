import React from "react";
import { Link } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import CarouselPage from "./CarouselPage";


const AnimationPage = ({ cardList }) => {
  return (
    <>
      <MDBAnimation type="fadeInUp">
        <CarouselPage />
        {/* <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/Be-Connected/FinalImages/InnerComunities/Hero_Desktop_ICTHub.ashx"
          className="img-fluid bannerAllowance"
          alt="Imagen endava" /> */}
      </MDBAnimation>
     
      <MDBRow className="container-banner">
        <MDBCol md="1">

        </MDBCol>
        <MDBCol md="10">
          <MDBAnimation type="fadeInUp">
          <h1 className="fontLight upperCaseFonts">Allowance Management Site</h1>
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
        {
          cardList && cardList.map((card, i) => (
            <MDBCol md="3" key={i}>
              {/* delay proporciona un delay multiplicado por i ( posicion del array )
                generando un efecto de cadena en la animacion.. reveal*/}
              <MDBAnimation delay={`${(i*100)}ms`} type='fadeInLeftBig'>
                <MDBCard className="Card-Img">
                  <div className="container-IMG" key={card.name}>
                    <div className="div-img" >
                      <Link to={`/allowance/${card.name}`} >
                        <div className="ajustImg">
                        <img src={`/assets/img/${card.name}_IMG_min.png`} //{card.imgUrl}
                          className="img-fluid margenBottomMobile img"
                          alt={`Imagen logo ${card.name}`} />
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

                  <span className="titleModule">{card.completeName}</span>
                </MDBCard>
                <br />
              </MDBAnimation>
            </MDBCol>
            
          ))
         
        }
         <MDBCol md="3" key={"book"}>
          {/* delay proporciona un delay multiplicado por i ( posicion del array )
            generando un efecto de cadena en la animacion.. reveal*/}
          <MDBAnimation delay={`${(2*100)}ms`} type='fadeInLeftBig'>
            <MDBCard className="Card-Img">
              <div className="container-IMG" key={"book"}>
                <div className="div-img" >
                  <Link to={`/allowance/book`} >
                    <div className="ajustImg">
                    <img src={`/assets/img/book_IMG_min.png`} //{card.imgUrl}
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

              <span className="titleModule">BookAllowance</span>
            </MDBCard>
            <br />
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default AnimationPage;