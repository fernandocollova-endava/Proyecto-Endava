import { RECEIVE_ALLOWANCES,  } from '../../constants'

const initialState = {
    allowanceList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RECEIVE_ALLOWANCES:
        return {...state, allowanceList: [...action.allowanceList] };

        default:
            return state;
    }
};