import axios from "axios";
import { RECEIVE_HOME_OFFICE_LIST, RECEIVE_HOME_OFFICE_BIRTHDAY_LIST } from "../../constants";

export const receiveHomeOffice = function (homeOfficeList) {
    return {
        type: RECEIVE_HOME_OFFICE_LIST,
        homeOfficeList
    };
};

export const receiveBirthDayHomeOffice = function (list) {
    return {
        type: RECEIVE_HOME_OFFICE_BIRTHDAY_LIST,
        list
    };
};


// Consulta los eventos actuales
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

// CREA UN NUEVO EVENTO EN EL DIA Y USUARIO DADO
export const addHomeOffice = (idUser, date) => dispatch => {
    return axios.post("/api/homeOffice", {
        idUser, date
    })
}
// Elimina un evento en el dia y usuario dado
export const deleteHomeOffice = (idUser, date) => dispatch => {
    return axios.delete(`/api/homeOffice/${idUser}/${date}`)
}

// Busca todos los proyectos actuales
export const fetchHomeOfficeProyect = (idUser, date) => dispatch => {
    return axios.get("/api/homeOffice/fetchProyect")
}
// Consulta los integrantes de cada proyecto
export const fetchHomeOfAllowanceProyect = (proyectName) => dispatch => {
    return axios.get(`/api/homeOffice/fetchAllowanceProyect/${proyectName}`)
}
// Consulta cumpleaños del mes
export const fetchHomeOfBirthDay = (month) => dispatch => {
    return axios.get(`/api/homeOffice/birthDay/${month}`)
        .then((list)=>dispatch(receiveBirthDayHomeOffice(list.data)))
}
