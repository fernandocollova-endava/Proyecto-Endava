import axios from "axios";
import { RECEIVE_HOME_OFFICE_LIST } from "../../constants";

export const receiveHomeOffice = function (homeOfficeList) {
    return {
        type: RECEIVE_HOME_OFFICE_LIST,
        homeOfficeList
    };
};

export const fetchHomeOffice = (year, month, proyect) => dispatch => {
    return axios.get("/api/homeOffice/", {
        params: {
            year,
            month,
            proyect
        }
    })
    .then(homeOfficeList => dispatch(receiveHomeOffice(homeOfficeList.data)))
}

export const addHomeOffice = (idUser, date) => dispatch => {
    return axios.post("/api/homeOffice", {
        idUser, date
    })
}