import { RECEIVE_ALLOWANCES, RECEIVE_ADMIN_ALLOWANCES, RECEIVE_PENDING_ALLOWANCES } from '../../constants'

const initialState = {
    allowanceList: [],
    adminAllowances: [],
    pendingAllowances: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RECEIVE_ALLOWANCES:
        return {...state, allowanceList: [...action.allowanceList] };
        case RECEIVE_ADMIN_ALLOWANCES:
        return {...state, adminAllowances: [...action.adminAllowances] };    
        case RECEIVE_PENDING_ALLOWANCES:
        return {...state, pendingAllowances: [...action.pendingAllowances] }; 

        default:
            return state;
    }
};