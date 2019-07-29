import { USER_LOGOUT, RECEIVE_LOGGED_USER, SET_AVATAR } from "../../constants";

const initialState = {
  user: {},
  avatar: {}
  // userAdmin:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LOGGED_USER:
      return Object.assign({}, state, 
            { 
              user: action.loggedUser ,
              avatar:action.loggedUser.avatar
            });

    case SET_AVATAR:
      return Object.assign({}, state, { avatar: action.data.data });

    case USER_LOGOUT:

      return { ...state, user: {} }

    // case RECEIVE_ADMINS:
    //   return { ...state, admins: action.admins };

    default:
      return state;
  }
};
