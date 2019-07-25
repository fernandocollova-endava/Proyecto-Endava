import { RECEIVE_HOME_OFFICE_LIST } from "../../constants";

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case RECEIVE_HOME_OFFICE_LIST:
      return {...state, list: [...action.homeOfficeList] };

    default:
      return state;
  }
};
