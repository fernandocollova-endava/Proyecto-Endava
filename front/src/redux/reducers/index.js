import { combineReducers } from "redux";

import allowanceReducer from "./allowanceReducer";

export default combineReducers({
    allowance: allowanceReducer,
  
});