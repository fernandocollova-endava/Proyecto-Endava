import { combineReducers } from "redux";

import allowanceReducer from "./allowanceReducer";
import userReducer from "./user-reducer";
import eventReducer from './disciplineEvent-reducer'
import navbarReducer from "./navbarReducer";

export default combineReducers({
    allowance: allowanceReducer,
    user: userReducer,
    event: eventReducer,
    nav: navbarReducer
});