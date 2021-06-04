import { combineReducers } from "redux";

import authReducer from "./auth";
import formation from "./formation";
import Message from "./messages";

const Reducers = combineReducers({ authReducer, formation, Message });

export default Reducers;
