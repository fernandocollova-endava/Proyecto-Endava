import axios from "axios";
import { ADD_ALLOWANCE_TO_DB, RECEIVE_ALLOWANCES, RECEIVE_ADMIN_ALLOWANCES } from "../../constants";

export const receiveAllowances = function(allowanceList) {
  return {
    type: RECEIVE_ALLOWANCES,
    allowanceList
  };
};
export const receiveAdminAllowances = function(adminAllowances) {
  return {
    type: RECEIVE_ADMIN_ALLOWANCES,
    adminAllowances
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
export const fetchAllowances = (userId, allowanceId) => dispatch => {
 
  return axios
    .get("/api/allowance/search", {
      params:{
        allowanceId: allowanceId,
        userId: userId
      }
    })
    .then(res => res.data)
    .then(allowanceList => dispatch(receiveAllowances(allowanceList)));
};
export const fetchAdminAllowances =() => dispatch =>{
  
  return axios.get('/api/allowance/')
  .then(res => res.data)
  .then(adminAllowances =>{

    console.log("SOOOOOo", adminAllowances)
    dispatch(receiveAdminAllowances(adminAllowances))
  
  })

}
