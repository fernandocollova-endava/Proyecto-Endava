import axios from "axios";
import {RECEIVE_EVENT_LIST, RECEIVE_TECH_LIST} from "../../constants";

export const receiveEventList = function(eventList) {
  
  return {
    type: RECEIVE_EVENT_LIST,
    eventList
  };
};

export const receiveTechList = function(techList) {

  return {
    type: RECEIVE_TECH_LIST,
    techList
  };
};


export const createDisciplineEvents = (data, user) => dispatch => {

  return axios
    .post("/api/disciplineEvent", { data, user }) 
    .then(eventList => eventList); //retorno el axios y el el container, realizado el ingreso vuelvo a ejecutar el fetch
};
export const fetchDisciplineEvents = userId => dispatch => {
 
  return axios
    .get(`/api/disciplineEvent/`, {
      params: {
        userId
      }
    })
    .then(res => res.data)
    .then(eventList => {
      console.log("soy eventListAXIOS", eventList)
      dispatch(receiveEventList(eventList))
      return eventList
    
    });
}; 

export const fetchTechonogies =()=> dispatch => {
  return axios.get("/api/disciplineEvent/technologies")
  .then(res => res.data)
  .then(techList => dispatch(receiveTechList(techList)))

  }
    

