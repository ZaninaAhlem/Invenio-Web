import { combineReducers } from "redux";

import authReducer from "./auth";
import formation from "./formation";
import Message from "./messages";
import Formateur from "./formateur";

const Reducers = combineReducers({
  authReducer,
  formation,
  Message,
  Formateur,
});

export default Reducers;
