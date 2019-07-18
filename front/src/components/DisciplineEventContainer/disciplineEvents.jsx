import React from "react";
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBAnimation,
  MDBIcon,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdbreact";

import ModalAviso from "../ModalContainer/modalAviso";
import { columnsEvents } from '../../auxFunctions/auxFunctions'

export default function DisciplineEvent ({onFormSubmit, onChange, eventList}) {

    return (
      <>
      {/* {evenList && console.log("soy las events", evenList)} */}
        <MDBRow className="container-banner">
          <MDBCol md="1" />
          <MDBCol md="10">
            <h1 className="upperCaseFonts">Share your knowledge and empower your professional activity.</h1>
            <MDBAnimation type="fadeInUp">
              <p className="TextParrafo">
                We began our journey as a consulting firm delivering real
                transformation through IT strategy and architecture services for
                some of the world’s largest banks and payments companies. Over
                the past 18 years, we marked important milestones towards
                becoming global through opening delivery centres and offices in
                North and Latin America, as well as Western and Central Europe.
                Our guiding philosophy has always been the same: We focus on
                helping people to be successful. The people who work for us, the
                people who engage with us, and the people who use the systems
                and applications we design, build, and operate.
              </p>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="1" />
        </MDBRow>
        <hr />
        {/* FORMULARIO  */}
        <MDBRow className="container-banner">
          <MDBCol md="1" />
          <MDBCol md="4">
            <MDBAnimation type="fadeInUp">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={onFormSubmit}>
                    <p className="h4 text-center py-4">
                    Send us your topic
                    </p>

                    <div className="grey-text">
                      <MDBInput
                        label="Event name"
                        icon="book"
                        group
                        required
                        autoComplete="off"
                        validate
                        name="topic"
                        onChange={onChange}
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="Description..."
                        icon="comment-alt"
                        required
                        group
                        autoComplete="off"
                        type="textarea"
                        name="observation"
                        onChange={onChange}
                        validate
                        error="wrong"
                        success="right"
                      />

                      <MDBInput
                        icon="calendar-alt"
                        group
                        type="date"
                        name="date"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <br/><br/>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn
                        color="light-blue"
                        className="mb-3 btnEv-red rounded mb-0 border-0 btnAllowance"
                        type="submit"
                      >
                        Send form <MDBIcon icon="angle-right" />
                      </MDBBtn>
                    </div>
                    <i className="textAlert">
                      *Please note that only jpg, png and PDF files up to 10MB
                      are accepted.
                    </i>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="6">
          <MDBAnimation type="fadeInUp">
           
           {(!eventList.length)? <label>Sorry, there are no results for your selection... <br/><br/></label>:
           <MDBTable btn fixed responsive>
             <MDBTableHead columns={columnsEvents} />
             <MDBTableBody rows={eventList} />
           </MDBTable>}

                        
         </MDBAnimation>
          </MDBCol>
        </MDBRow>

        {/* ----------------------------------------------------- */}

      </>
    );
  }

