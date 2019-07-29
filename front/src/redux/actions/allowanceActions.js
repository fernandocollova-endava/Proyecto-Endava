import axios from "axios";
import {
  RECEIVE_ALLOWANCES,
  RECEIVE_ADMIN_ALLOWANCES,
  RECEIVE_ACTIVE_ALLOWANCES,
  RECEIVE_HISTORY_ALLOWANCES,
  RECEIVE_BOOK_ALLOWANCES,
  RECEIVE_CURRENT_BOOK_A,
  RECEIVE_BOOK_INSTALLMENTS
} from "../../constants";

export const receiveAllowances = function (allowanceList) {
  return {
    type: RECEIVE_ALLOWANCES,
    allowanceList
  };
};
export const receiveBookAllowances = function(bookAllowances) {
  return {
    type: RECEIVE_BOOK_ALLOWANCES,
    bookAllowances
  }
}

export const receiveAdminAllowances = function (adminAllowances) {
  return {
    type: RECEIVE_ADMIN_ALLOWANCES,
    adminAllowances
  };
};


export const receiveActiveAllowances = (activeAllowances) => {
  return {
    type: RECEIVE_ACTIVE_ALLOWANCES,
    activeAllowances
  };
}
export const receiveHistoryAllowances = (historyAllowances) => {
  return {
    type: RECEIVE_HISTORY_ALLOWANCES,
    historyAllowances
  };
}
export const receiveCurrentBookA = (currentBookAllowances) =>{
   
  return {
    type: RECEIVE_CURRENT_BOOK_A,
    currentBookAllowances
  }
}
export const receiveBookInstallments = (bookInstallments) => {
  return {
    type: RECEIVE_BOOK_INSTALLMENTS,
    bookInstallments
  };
}


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
export const fetchAllowances = (date, userId, allowanceId, status, allUser) => dispatch => {
    
  return axios
    .get("/api/allowance/search", {
      params: {
        dateStart:date.start,
        dateEnd:date.end,
        allowanceId,
        userId,
        status,
        allUser
      }
    })
    .then(res => res.data)
    .then(allowanceList => dispatch(receiveAllowances(allowanceList)));
};
export const fetchAdminAllowances = () => dispatch => {
  return axios
    .get("/api/allowance/")
    .then(res => res.data)
    .then(adminAllowances => {
      dispatch(receiveAdminAllowances(adminAllowances));
    });
};

export const fetchAllowanceActive = (id) => dispatch => {
  return axios
    .get(`/api/allowance/findActive/${id}`)
    .then(activeAllowances => {
     return dispatch(receiveActiveAllowances(activeAllowances.data));
    });
};

export const fetchAllowanceHistory = (employeeId, allowanceId) => dispatch => {
  return axios
    .get(`/api/allowance/history/${employeeId}/${allowanceId}`)
    .then(historyAllowances => {
      dispatch(receiveHistoryAllowances(historyAllowances.data));
    });
};

// Elimina allowance (Si se encuentra Pendiente)
export const deleteAllowance = (id) => dispatch => {
  return axios
    .delete(`/api/allowance/${id}/delete`)
};

// Modifica estado (ADMIN)
export const editStatusAllowance = (id, status, observation) => dispatch => {
  return axios
    .put(`/api/allowance/${id}/edit`, { status, observation })
};

// 
export const fetchCountPending = (userId) => dispatch => {
  return axios
    .get(`/api/allowance/count`,{
      params: {
        userId
      }
    })
};

export const fetchCurrentBookA = (month, adminPath, userId) => dispatch => {  

  return axios.get("/api/allowance/book/current",{
    params:{
      month,
      adminPath,
      userId,
    }})
  .then(res =>res.data)
  .then(currentBookAllowances=>{
 
    dispatch(receiveCurrentBookA(currentBookAllowances))
  })
}
export const fetchBookAllowances = (user, adminPath) => dispatch => {  
 
return axios.get("/api/allowance/book",{user:user,adminPath:adminPath})
.then(res =>res.data)
.then(bookAllowances=>{dispatch(receiveBookAllowances(bookAllowances))
})
}

export const fetchBookInstallments = (receiptPath, allowanceId) => dispatch => {
  return axios
    .get(`/api/allowance/book/installments/${receiptPath}/${allowanceId}`)
    .then(res =>res.data)
    .then(bookInstallments => {
      dispatch(receiveBookInstallments(bookInstallments));
    });
};


export const sendEmailConfirm = (userData, allowanceName) => dispatch => {
  
  return axios.post("/api/allowance/emailConfirm", { userData: userData, allowanceName: allowanceName })
      .then(emailConfirm => emailConfirm);
};