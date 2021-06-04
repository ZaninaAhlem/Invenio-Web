import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import Reducers from "../reducers";

const middleware = [thunk];

const makeStore = () =>
  createStore(Reducers, compose(applyMiddleware(...middleware)));
//const store = createStore(Reducers, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore);
