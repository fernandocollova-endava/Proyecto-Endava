import axios from "axios";
import { RECEIVE_HOME_OFFICE_LIST } from "../../constants";

export const receiveHomeOffice = function (homeOfficeList) {
    return {
        type: RECEIVE_HOME_OFFICE_LIST,
        homeOfficeList
    };
};

export const fetchHomeOffice = (year, month, sector) => dispatch => {
    return axios.get("/api/homeOffice/", {
        params: {
            year,
            month,
            sector
        }
    })
    .then(homeOfficeList => dispatch(receiveHomeOffice(homeOfficeList.data)))
}

export const addHomeOffice = (idUser, date) => dispatch => {
    return axios.post("/api/homeOffice", {
        idUser, date
    })
}