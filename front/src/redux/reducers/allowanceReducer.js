//import { RECEIVE_STATUSES,  } from '../../constants'

const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        // case RECEIVE_SALE:
        //     return Object.assign({}, state, { selectedSale: action.sale });

        default:
            return state;
    }
};