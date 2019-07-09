import axios from "axios";
import { ADD_ALLOWANCE_TO_DB, RECEIVE_ALLOWANCES } from "../../constants";

export const receiveAllowances = function(allowanceList) {
  return {
    type: RECEIVE_ALLOWANCES,
    allowanceList
  };
};

export const createAllowance = formData => dispatch => {
  console.log('so form daa del axios', formData)
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
  console.log("enre al AXIOSSSSSSSSSSS", userId)
  return axios
    .get(`/api/alowance/search/:${userId}`)
    .then(res => res.data)
    .then(allowanceList => dispatch(receiveAllowances(allowanceList)));
};
