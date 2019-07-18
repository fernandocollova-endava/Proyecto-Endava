import { combineReducers } from "redux";

import allowanceReducer from "./allowanceReducer";
import userReducer from "./user-reducer";
import eventReducer from './disciplineEvent-reducer'

export default combineReducers({
    allowance: allowanceReducer,
    user: userReducer,
    event: eventReducer
  
});