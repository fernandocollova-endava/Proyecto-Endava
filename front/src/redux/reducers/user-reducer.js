import { USER_LOGOUT,  RECEIVE_LOGGED_USER } from "../../constants";

const initialState = {
  user: {},
  // userAdmin:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
  
    case RECEIVE_LOGGED_USER:
      return Object.assign({}, state, { user: action.loggedUser });

    case USER_LOGOUT:
    
      return { ...state, user: {} }

    // case RECEIVE_ADMINS:
    //   return { ...state, admins: action.admins };

    default:
      return state;
  }
};
