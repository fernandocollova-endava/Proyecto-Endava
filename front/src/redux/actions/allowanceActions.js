import axios from "axios";
import {
  RECEIVE_ALLOWANCES,
  RECEIVE_ADMIN_ALLOWANCES,
  RECEIVE_PENDING_ALLOWANCES,
  RECEIVE_ACTIVE_ALLOWANCES,
  RECEIVE_HISTORY_ALLOWANCES
} from "../../constants";

export const receiveAllowances = function (allowanceList) {
  return {
    type: RECEIVE_ALLOWANCES,
    allowanceList
  };
};
export const receiveAdminAllowances = function (adminAllowances) {
  return {
    type: RECEIVE_ADMIN_ALLOWANCES,
    adminAllowances
  };
};

export const receivePendingAllowances = function (pendingAllowances) {
  return {
    type: RECEIVE_PENDING_ALLOWANCES,
    pendingAllowances
  };
}
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
export const fetchAllowances = (userId, allowanceId, status, allUser) => dispatch => {
  return axios
    .get("/api/allowance/search", {
      params: {
        allowanceId: allowanceId,
        userId: userId,
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

export const fetchPendingAllowances = () => dispatch => {
  return axios
    .get("/api/allowance/search/all")
    .then(res => res.data)
    .then(pendingAllowances => {
      dispatch(receivePendingAllowances(pendingAllowances));
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