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
 
  return {
    type: USER_LOGOUT
  };
};


export const loginUser = userData => dispatch => {
  
  return axios
    .post("/api/employee/login", userData)
    .then(res => res.data)
    .then(user => {
      dispatch(receiveLoggedUser(user));
      return user
    });
};

export const logout = () => dispatch => {

  return axios
    .get("/api/employee/logout")
    .then(res => res.data)
    .then(answer => {
  
      dispatch(userLogout());
      return answer;
    });
};
export const updatePass = (password, userId) => dispatch => {
  
  return axios
    .post("/api/employee/password/update", {password:password, userId:userId})
    .then(res => res.data)

};

export const fetchLoggedUser = () => dispatch => {
  return axios
    .get("/api/employee/logged")
    .then(res => res.data)
    .then(user => {
      dispatch(receiveLoggedUser(user));
    });
};