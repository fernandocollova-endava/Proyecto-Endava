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


import { columnsEvents } from "../../auxFunctions/auxFunctions";

export default function DisciplineEvent({
  onFormSubmit,
  onChange,
  eventList,
  handleClick,
  techList,
  clockValue,
  onKeyDown
}) {
  return (
    <>
      {/* {evenList && console.log("soy las events", evenList)} */}
      <MDBRow className="container-banner">

        <MDBCol md="9">
          <h1 className="upperCaseFonts">
            Share your knowledge and empower your professional activity.
          </h1>
          <MDBAnimation type="fadeInUp">
            <p className="TextParrafo">
              We began our journey as a consulting firm delivering real
              transformation through IT strategy and architecture services for
              some of the world’s largest banks and payments companies. Over the
              past 18 years, we marked important milestones towards becoming
              global through opening delivery centres and offices in North and
              Latin America, as well as Western and Central Europe. Our guiding
              philosophy has always been the same: We focus on helping people to
              be successful. The people who work for us, the people who engage
              with us, and the people who use the systems and applications we
              design, build, and operate.
            </p>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="3">
          <MDBAnimation type="fadeInDown">
            <img src="https://www.endava.com/en/Digital/-/media/EndavaDigital/Endava/Images/Expert-Insights/Success-Stories/Increasing-Efficiency-through-Digital-Evolution/480.ashx" width="100%" />
          </MDBAnimation>
        </MDBCol>

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
                  <p className="h4 text-center py-4">Send us your topic</p>
                  <select
                    className="browser-default custom-select"
                    name="allowance"
                    onChange={handleClick}
                  >
                    <option>Choose your Technologie...</option>
                    {techList &&
                      techList.map(tech => (
                        <option className="capitalizeName" value={tech.name}>
                          {tech.name}
                        </option>
                      ))}
                    <option value="Otros">Other...</option>
                  </select>

                  <div className="grey-text" >
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
                      icon="calendar-alt"
                      group
                      type="date"
                      name="date"
                      onChange={onChange}
                      required
                    />
                    <MDBInput
                      icon="clock"
                      group
                      type="text"
                      autoComplete="off"
                      label="Time HH:MM (16:20)"
                      value={clockValue}
                      name="time"
                      onKeyDown={onKeyDown}
                      onChange={onChange}
                      maxLength={5}
                      required
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
                  </div>

                  <div className="text-center py-4 mt-3">
                    <MDBBtn
                      color="light-blue"
                      className="mb-3 btnEv-red rounded mb-0 border-0 btnAllowance"
                      type="submit"
                    >
                      Send form <MDBIcon icon="angle-right" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>

        <MDBCol md="7">
          {/* FORMULARIO  */}

          <MDBAnimation type="fadeInUp">
            {!eventList.length ? (
              <label>
                Sorry, there are no results for your selection... <br />
                <br />
              </label>
            ) : (
                <div className="table-responsive">
                  <table className="table btn-table table-fixed">
                    <thead>
                      <tr>
                        <th style={({width:240})}>Topic</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventList && eventList.map((item, i) => (
                        <tr style={({ height: 32 })} key={i}>
                          <td className="upperCaseFonts">{item.topic}</td>
                          <td className={`${item.status} whiteBorder`}>{item.status}</td>
                          <td>{item.date}</td>
                          <td>{item.time}</td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              )}
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="1" />
      </MDBRow>
      <hr />

      {/* ----------------------------------------------------- */}
    </>
  );
}
