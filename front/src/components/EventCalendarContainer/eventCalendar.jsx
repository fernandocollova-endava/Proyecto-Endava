import React from "react";
import Moment from 'react-moment';
// import moment from moment().format('MMMM Do YYYY, h:mm:ss a')

export default function eventCalendar({eventList, handleClick, onKeyDown}) {
  return (
    <div>
      {console.log("soy la lista", eventList)}
      <div class="page">
        <div class="page__demo">
          <div class="main-container page__container">
            <div class="timeline">
             
              <div class="timeline__group">
              {eventList.length && eventList.map(item => (
                <div>
                <span class="timeline__year"><Moment format="YYYY">{item.date}</Moment></span>
                <div class="timeline__box"> {console.log(<Moment format="YYYY" withTitle>{item.date}</Moment>)}
                   <div class="timeline__date">
                     <span class="timeline__day"><Moment format="D">{item.date}</Moment></span>
                     <span class="timeline__month"><Moment format="MMM">{item.date}</Moment></span>
                   </div>
                   <div class="timeline__post">
                     <div class="timeline__content">
                       <p>
                        {item.description}
                       </p>
                     </div>
                   </div>
                </div>
                <br/>
                 </div>
              ))
              }  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
