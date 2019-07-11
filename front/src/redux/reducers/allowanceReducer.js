import { RECEIVE_ALLOWANCES, RECEIVE_ADMIN_ALLOWANCES } from '../../constants'

const initialState = {
    allowanceList: [],
    adminAllowances: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RECEIVE_ALLOWANCES:
        return {...state, allowanceList: [...action.allowanceList] };
        case RECEIVE_ADMIN_ALLOWANCES:
        return {...state, adminAllowances: [...action.adminAllowances] };    
        default:
            return state;
    }
};