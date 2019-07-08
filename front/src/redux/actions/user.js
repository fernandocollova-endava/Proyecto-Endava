import axios from "axios";
import {
  RECEIVE_LOGGED_USER,
  USER_LOGOUT
} from "../../constants";

export const receiveLoggedUser = loggedUser => ({
  type: RECEIVE_LOGGED_USER,
  loggedUser
});

export const userLogout = function() {
  console.log("enbre al logouuuuuuu")
  return {
    type: USER_LOGOUT
  };
};


export const logginUser = userData => dispatch => {
  
  return axios
    .post("/api/employee/login", userData)
    .then(res => res.data)
    .then(user => {
      dispatch(receiveLoggedUser(user));
    });
};

export const logout = () => dispatch => {
  console.log("ENTRE AL AXIOS");
  return axios
    .get("/api/employee/logout")
    .then(res => res.data)
    .then(answer => {
  
      dispatch(userLogout());
      return answer;
    });
};

export const fetchLoggedUser = () => dispatch => {
  return axios
    .get("/api/employee/logged")
    .then(res => res.data)
    .then(user => {
      dispatch(receiveLoggedUser(user));
    });
};