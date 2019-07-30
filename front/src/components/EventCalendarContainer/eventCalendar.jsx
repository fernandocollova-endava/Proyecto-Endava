import React from "react";
import Moment from 'react-moment';
import moment from "moment"
import { Link } from "react-router-dom"
import {
  MDBAnimation, MDBContainer, MDBCol, MDBRow, MDBFormInline
} from 'mdbreact';


export default function eventCalendar({ eventList, handleClick, onKeyDown }) {
  
  {console.log(eventList)}
  return (
    <MDBContainer fluid>
      <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className="upperCaseFonts title-container-fluid">
            <span className="titleMain"><i className="far fa-calendar-alt"></i> Events SCHEDULE</span>

            <span className="form-inline md-form topMarginLine">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
              <Link className="browser-default custom-select newRequest"
                to="/discipline-event/new">
                <i className="fas fa-plus-circle"></i> New Discipline event
                            </Link>
            </span>
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="12">
          <div className="page">
            <div className="page__demo">
              <div className="main-container page__container">
                <div className="timeline">
                  <div className="timeline__group">
                    {eventList.length && eventList.map((item, i) => (
                      
                      <MDBAnimation key={`id_${i}`} type="fadeInLeft" reveal={((i > 1) ? true : false)}>
                        <span className="timeline__year" key={i}><Moment format="YYYY">{item.date}</Moment></span>
                        <br/><br/>
                        <div className="timeline__box" key={`i${i}`}>
                          <div className="timeline__date">
                            <span className="timeline__day"><Moment format="D">{item.date}</Moment></span>
                            <span className="timeline__month"><Moment format="MMM">{item.date}</Moment></span>
                          </div>
                          <div className="timeline__post">
                            <div className="timeline__content"> <br /><span ><strong style={({fontWeight: "bold"})}>SCHEDULE:</strong> {moment(item.time, 'HH:mm').format('HH:mm')}Hs. </span>
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
