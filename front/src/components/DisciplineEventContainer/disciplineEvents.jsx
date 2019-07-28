import React from "react";
import { Link } from "react-router-dom"
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBAnimation,
  MDBIcon,
  MDBBtn, MDBFormInline

} from "mdbreact";

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
      <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className=" title-container">
            <span className="titleMain upperCaseFonts"><i className="far fa-calendar-plus"></i> DISCIPLINE EVENT</span>

            <MDBFormInline className="md-form topMarginLine">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
              
              <Link className="browser-default custom-select newRequest"
                to="/calendar"><i className="far fa-calendar-alt"></i> View Event Calendar
                </Link>
            </MDBFormInline>
          </p>
        </MDBCol>
        
      </MDBRow>
      <hr />

      {/* FORMULARIO  */}
      <MDBRow className="container-banner">
        <MDBCol md="4">
          <MDBAnimation type="fadeInUp">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={onFormSubmit}>
                 <span className="fontDiscipline">
                 Share your knowledge and empower your professional activity.
                 </span>

                  <div className="grey-text" >
                    <div class="md-form form-group">
                      <select required
                        className="form-control validate"
                        name="techName"
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
                    </div>
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
                      style={({marginTop: -32})}
                    />
                    <MDBInput
                      icon="calendar-alt"
                      group
                      type="date"
                      name="date"
                      onChange={onChange}
                      required
                      style={({marginTop: -32})}
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
                        <th style={({ width: 240 })}>Topic</th>
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
