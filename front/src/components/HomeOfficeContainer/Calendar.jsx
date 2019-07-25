import React from "react";
import { MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import Day from './day'

const Calendar = ({ handleAddHome, listHomeOffice, next, previous, jump, currentYear, currentMonth }) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <>
      <MDBRow className="container-banner">
        <MDBCol md="1">

        </MDBCol>
        <MDBCol md="10">
          <MDBAnimation type="fadeInUp">
            <h1 className="fontLight upperCaseFonts">Allowance Management Site</h1>
            <p className="TextParrafo">
              Our guiding philosophy has always been the same: We focus on helping people to be successful. The people who work for us, the people who engage with us.
            </p>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="1">
        </MDBCol>
      </MDBRow>

      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner marginDemo">
        <MDBCol md="2">
          <div className="form-inline">
            <button className="btn btn-primary btn-block" onClick={previous}>Previous</button><br />
            <button className="btn btn-primary btn-block" onClick={next}>Next</button>
          </div>
          <br />
          <form className="form-inline" onSubmit={jump}>
            <label className="lead mr-2 ml-2">Jump To: </label> <br />
            <select className="form-control" name="month">
              <option value="0">Jan</option>
              <option value="1">Feb</option>
              <option value="2">Mar</option>
              <option value="3">Apr</option>
              <option value="4">May</option>
              <option value="5">Jun</option>
              <option value="6">Jul</option>
              <option value="7">Aug</option>
              <option value="8">Sep</option>
              <option value="9">Oct</option>
              <option value="10">Nov</option>
              <option value="11">Dec</option>
            </select>

            <br />
            <label></label>
            <select className="form-control" name="year">
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select></form>
        </MDBCol>
        <MDBCol md="9">
          <MDBAnimation type="fadeInUp">
            <div className="card">
              <h3 className="card-header upperCaseFonts textCenter"> {`${months[currentMonth]} - ${currentYear}`} </h3>
              <table className="table table-bordered table-responsive-sm" id="calendar">
                <thead>
                  <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                  </tr>
                </thead>
                <tbody id="calendar-body">
                  <Day
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    handleAddHome={handleAddHome}
                    listHomeOffice={listHomeOffice}
                  />
                </tbody>
              </table>

            </div>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Calendar;