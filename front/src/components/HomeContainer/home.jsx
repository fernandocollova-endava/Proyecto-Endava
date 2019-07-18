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
              
              {/* We began our <strong className="fontEmphasis">journey as a consulting</strong> firm delivering real transformation through IT strategy and architecture services for some of the world’s largest banks and payments companies.
              
              Over the past 18 years, <strong className="strongEmphasis"> we marked important</strong> milestones towards becoming global through opening delivery centres and offices in North and Latin America, as well as Western and Central Europe.
              Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us, and the people who use the systems and applications we design, build, and operate. */}
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
      </MDBRow>
    </>
  );
};

export default AnimationPage;