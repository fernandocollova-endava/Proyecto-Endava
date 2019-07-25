import React from "react";
import Moment from 'react-moment';
import moment from "moment"



export default function eventCalendar({eventList, handleClick, onKeyDown}) {
  console.log()
  
  return (
    <div>
    
      <div class="page">
       <h3 className="upperCaseFonts">Schedule of events</h3>
        <div class="page__demo">
          <div class="main-container page__container">
            <div class="timeline">
             
              <div class="timeline__group">
              {eventList.length && eventList.map(item => (
                
            <div>
            
                <span class="timeline__year"><Moment format="YYYY">{item.date}</Moment></span>
                <div class="timeline__box"> 
                   <div class="timeline__date">
                     <span class="timeline__day"><Moment format="D">{item.date}</Moment></span>
                     <span class="timeline__month"><Moment format="MMM">{item.date}</Moment></span>
                   </div>

                   <div class="timeline__post">
                     <div class="timeline__content"> <br/><span>Schelude: {moment(item.time, 'HH:mm').format('HH:mm')} </span>
                       <img src={`/assets/img/events/${item.technologie.image}`} alt="" width="100px"/>
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
