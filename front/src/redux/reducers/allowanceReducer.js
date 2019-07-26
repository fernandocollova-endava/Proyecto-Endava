import { RECEIVE_ALLOWANCES,RECEIVE_BOOK_ALLOWANCES, RECEIVE_BOOK_INSTALLMENTS, RECEIVE_ADMIN_ALLOWANCES, RECEIVE_HISTORY_ALLOWANCES, RECEIVE_ACTIVE_ALLOWANCES, RECEIVE_CURRENT_BOOK_A } from '../../constants'

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
        bookAllowances:[],
        currentBookAllowances:[],
        bookInstallments:[]
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
            return {...state, bookAllowances: [...action.bookAllowances]};
        case RECEIVE_CURRENT_BOOK_A:
            return {...state, currentBookAllowances: [...action.currentBookAllowances]}   
        
        case RECEIVE_BOOK_INSTALLMENTS:
            
            return {...state, bookInstallments: [...action.bookInstallments] }; 
        case RECEIVE_HISTORY_ALLOWANCES:
            return {...state, historyAllowances: [...action.historyAllowances] }; 

    default:
      return state;
  }
};
