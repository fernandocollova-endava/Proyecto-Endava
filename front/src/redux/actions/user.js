import axios from "axios";
import {
  RECEIVE_LOGGED_USER,
  USER_LOGOUT, SET_AVATAR
} from "../../constants";

export const receiveLoggedUser = loggedUser => ({
  type: RECEIVE_LOGGED_USER,
  loggedUser
});

export const userLogout = function () {
  return {
    type: USER_LOGOUT
  };
};
export const setAvatar = (data) => {
  return {
    type: SET_AVATAR,
    data
  }
}



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
export const updatePass = (password, userId, oldPass) => dispatch => {
  if (oldPass) {
    return axios
      .post("/api/employee/password/profile/update", { password: password, userId: userId, oldPass: oldPass })
      .then(res => res.data)
      .then(passConfirm => {
        return passConfirm
      })
      .catch(error => console.log(error))

  } else {
    return axios
      .post("/api/employee/password/update", { password: password, userId: userId })
      .then(res => res.data)
      .then(passConfirm => {
        return passConfirm
      })
      .catch(error => console.log(error))
  }
};

export const fetchLoggedUser = () => dispatch => {
  return axios
    .get("/api/employee/logged")
    .then(res => res.data)
    .then(user => dispatch(receiveLoggedUser(user)));
};

export const updateAvatar = formData => dispatch => {
  return axios({
    method: "PUT",
    data: formData,
    url: "/api/employee/avatar",
    headers: {
      "content-type": "multipart/form-data"
    }
  })
    .then(data => dispatch(setAvatar(data)))
};