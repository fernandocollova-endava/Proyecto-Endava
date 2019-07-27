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
              <span className="titleMain upperCaseFonts"><i className="far fa-calendar-plus"></i> NEW ALLOWANCE</span>

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
      <br/><br/>
    </>
  );
};

export default AnimationPage;