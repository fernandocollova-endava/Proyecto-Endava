import axios from "axios";
import { RECEIVE_EVENT_LIST, RECEIVE_TECH_LIST, RECEIVE_ACTIVE_EVENT } from "../../constants";

export const receiveEventList = function(eventList) {
  return {
    type: RECEIVE_EVENT_LIST,
    eventList
  };
};
export const receiveActiveEvent = function(activeEvent) {
  return {
    type: RECEIVE_ACTIVE_EVENT,
    activeEvent
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

export const fetchDisciplineEvents = (userId, adminUrl, status) => dispatch => {
    return axios
    .get(`/api/disciplineEvent/`, {
      params: {
        userId,
        adminUrl,
        status
      }
    })
    .then(res => res.data)
    .then(eventList => {
      dispatch(receiveEventList(eventList));
      return eventList;
    });

  
};

export const fetchEmployeeEvents = (userId) => dispatch => {
return axios.get(`/api/disciplineEvent/${userId}`, {
})
.then(res => res.data)
.then(eventList => {
  dispatch(receiveEventList(eventList));
  return eventList;
});
}

export const fetchActiveEvent = (id) => dispatch => { 
return axios
.get(`/api/disciplineEvent/findActive/${id}`)
.then(res => res.data)
.then(activeEvent => {
 return dispatch(receiveActiveEvent(activeEvent));
});
}

export const editEventStatus = (id, status, observation) => dispatch => {
  return axios
    .put(`/api/disciplineEvent/${id}/edit`, { status, observation })
};

export const deleteEvent = (id) => dispatch => {
  return axios
    .delete(`/api/disciplineEvent/${id}/delete`)
};

export const fetchTechonogies = () => dispatch => {
  return axios
    .get("/api/disciplineEvent/technologies")
    .then(res => res.data)
    .then(techList => dispatch(receiveTechList(techList)));
};
