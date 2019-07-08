import axios from "axios";
import { ADD_ALLOWANCE_TO_DB, RECEIVE_ALLOWANCES } from "../../constants";

export const receiveAllowances = function(allowanceList) {
  return {
    type: RECEIVE_ALLOWANCES,
    allowanceList
  };
};

export const createAllowance = formData => dispatch => {
  return axios({
    method: "POST",
    data: formData,
    url: "/api/allowance",
    headers: {
      "content-type": "multipart/form-data"
    }
  });
};
export const fetchAllowances = userId => dispatch => {
  return axios
    .get(`/api/alowance/search/:${userId}`)
    .then(res => res.data)
    .then(allowanceList => dispatch(receiveAllowances(allowanceList)));
};
