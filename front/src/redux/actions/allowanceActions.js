import axios from 'axios'

//import { ADD_ALLOWANCE_TO_DB } from '../../constants';


export const createAllowance = (formData) => dispatch => {
    return axios({
        method: 'POST',
        data: formData,
        url: "/api/allowance",
        headers: {
            'content-type': 'multipart/form-data'
        }
    })

}
