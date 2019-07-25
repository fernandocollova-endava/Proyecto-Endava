import { RECEIVE_HOME_OFFICE_LIST, RECEIVE_HOME_OFFICE_BIRTHDAY_LIST } from "../../constants";

const initialState = {
  list: [],
  birtDayList:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case RECEIVE_HOME_OFFICE_LIST:
      return {...state, list: [...action.homeOfficeList] };

    case RECEIVE_HOME_OFFICE_BIRTHDAY_LIST:
      return {...state, birtDayList: [...action.list] };

    default:
      return state;
  }
};
