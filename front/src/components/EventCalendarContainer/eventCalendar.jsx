import React from "react";
import Moment from 'react-moment';
import moment from "moment"
import { Link } from "react-router-dom"
import {
  MDBAnimation, MDBContainer, MDBCol, MDBRow, MDBFormInline
} from 'mdbreact';


export default function eventCalendar({ eventList, handleClick, onKeyDown }) {
  return (
    <MDBContainer fluid>
      <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className="upperCaseFonts title-container-fluid">
            <span className="titleMain"><i className="far fa-calendar-alt"></i> Events SCHEDULE</span>

            <MDBFormInline className="md-form topMarginLine">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
              <Link className="browser-default custom-select newRequest"
                to="/discipline-event/new">
                <i className="fas fa-plus-circle"></i> Discipline event
                            </Link>
            </MDBFormInline>
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="12">
          <div class="page">
            <div class="page__demo">
              <div class="main-container page__container">
                <div class="timeline">
                  <div class="timeline__group">
                    {eventList.length && eventList.map((item, i) => (
                      
                      <MDBAnimation type="fadeInLeft" reveal={((i > 1) ? true : false)}>

                        <span class="timeline__year" key={i}><Moment format="YYYY">{item.date}</Moment></span>
                        <br/><br/>
                        <div class="timeline__box" key={`i${i}`}>
                          <div class="timeline__date">
                            <span class="timeline__day"><Moment format="D">{item.date}</Moment></span>
                            <span class="timeline__month"><Moment format="MMM">{item.date}</Moment></span>
                          </div>
                          <div class="timeline__post">
                            <div class="timeline__content"> <br /><span ><strong style={({fontWeight: "bold"})}>SCHEDULE:</strong> {moment(item.time, 'HH:mm').format('HH:mm')}Hs. </span>
                            <hr className="hrEvent"/>
                              <img src={`/assets/img/events/${item.technologie.image}`} className="imgCalendar" alt="" width="100px" />
                              <p className="textJustify">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <br />
                      </MDBAnimation>
                    ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <br />
      <br />
    </MDBContainer>
  )
}
