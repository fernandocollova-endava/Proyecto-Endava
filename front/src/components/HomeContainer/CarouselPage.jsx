import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";

const CarouselPage = () => {
  return (
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1 bannerAllowance"
        interval={6000} 
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Careers/Images/Be-Connected/FinalImages/InnerComunities/Hero_Desktop_ICTHub.ashx"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Automation/Automation_Hero-Desktop-1_1920x650.ashx"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Industries/RetailTrends/Landing_page_1_Hero_Desktop_1920x650.ashx"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>

  );
}

export default CarouselPage;