import { RECEIVE_ALLOWANCES,RECEIVE_BOOK_ALLOWANCES, RECEIVE_ADMIN_ALLOWANCES, RECEIVE_HISTORY_ALLOWANCES, RECEIVE_PENDING_ALLOWANCES, RECEIVE_ACTIVE_ALLOWANCES } from '../../constants'

const initialState = {
    allowanceList: [],
    adminAllowances: [],
    historyAllowances:[],
    activeAllowances: {
        amount: 0,
        observation: "",
        paymentDate: "",
        status: "",
        receiptPath: "img.jpeg",
        adminComment: '',
        allowanceDetail: {
            name: ""
        },
        employeeDetail: {
            name: ""
        }
        },
        bookAllowances:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case RECEIVE_ALLOWANCES:
            return {...state, allowanceList: [...action.allowanceList] };
        case RECEIVE_ADMIN_ALLOWANCES:
            return {...state, adminAllowances: [...action.adminAllowances] };     
        case RECEIVE_ACTIVE_ALLOWANCES:
            return Object.assign({}, state, { activeAllowances: action.activeAllowances });
        case RECEIVE_BOOK_ALLOWANCES:
            return {...state, bookAllowances: [...action.bookAllowances]}   

        case RECEIVE_HISTORY_ALLOWANCES:
            return {...state, historyAllowances: [...action.historyAllowances] }; 

    default:
      return state;
  }
};
