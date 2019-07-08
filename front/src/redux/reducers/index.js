import { combineReducers } from "redux";

import allowanceReducer from "./allowanceReducer";
import userReducer from "./user-reducer"

export default combineReducers({
    allowance: allowanceReducer,
    user: userReducer
  
});