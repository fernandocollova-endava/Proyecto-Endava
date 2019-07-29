import React from "react";
import { MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import Day from './day'

const Calendar = ({ handleAddHome, handleProyect, listHomeOffice, MDBFormInline, next, previous, changeYear, changeMonth,
  currentYear, currentMonth, proyectList, currentProyect, employeProyectList, birthDayList, isShowBirthDay, isShowAllowance, showHide }) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <>
      <MDBRow className="container-banner">
        <MDBCol md="12">
          <p className="upperCaseFonts title-container">
            <span className="titleMain"><i className="far fa-calendar-alt"></i> HOME OFFICE</span>

            <div className="form-inline md-form">
              {/* <MDBIcon icon="angle-double-right" /> &nbsp;&nbsp; */}
              <select className="browser-default custom-select" name="month" value={currentMonth} onChange={changeMonth}>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <select className="browser-default custom-select" name="year" value={currentYear} onChange={changeYear}>
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
              </select>
              <select className="browser-default custom-select" value={currentProyect} name="proyect" onChange={handleProyect}>
                {
                  proyectList && proyectList.map((item, i) => (
                    <option key={i} value={item.proyect}>{item.proyect}</option>
                  ))
                }

              </select>

            </div>
          </p>
        </MDBCol>
      </MDBRow>

      {/* FICHAS / MODULOS */}
      <MDBRow className="container-banner marginDemo">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore harum id, eum vitae corporis obcaecati delectus nostrum reiciendis dicta ipsa. Commodi dicta, dignissimos magni rem adipisci laborum in at minus!
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
                    birthDayList={birthDayList}
                  />
                </tbody>
              </table>

            </div>
          </MDBAnimation>
        </MDBCol>
        <MDBCol md="2">
          <MDBAnimation type="fadeInLeft">
            {/* <p>
              <button onClick={() => showHide('isShowAllowance')} className="btnEv-blue rounded-0 mb-0 border-0 showHomeOffice">Show Allowance</button>
              <button onClick={() => showHide('isShowBirthDay')} className="btnEv-blue rounded-0 mb-0 border-0 showHomeOffice">Show Birthday</button>
            </p> */}
            <strong>Work Team:</strong> <br />
            <div className={`form-control divListAllowance ${(isShowAllowance) ? '' : ''}`} >
              {employeProyectList && employeProyectList.map((item, i) => (
                <p key={i} className="itemName">
                  <i className="fas fa-user"></i> {item.name + ' ' + item.surname[0] + '.'}</p>
              ))}
            </div> <br/>
            <strong>BirthDay's:</strong> <br />
            <div className={`form-control divListAllowance ${(isShowBirthDay) ? '' : ''}`}>
              {birthDayList && birthDayList.map((item, i) => (
                <p key={i} className="itemName">
                  <i className="fas fa-birthday-cake"></i> {'(' + (item.birthdayDate).split('-')[2] + ') ' + item.name + ' ' + item.surname[0] + '.'}</p>
              ))}
            </div>
          </MDBAnimation>
        </MDBCol>
      </MDBRow><br/><br/>
    </>
  );
};

export default Calendar;