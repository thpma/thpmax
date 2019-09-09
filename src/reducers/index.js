import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import user from "./user";

const allReducers = combineReducers({
  user: user
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers, allStoreEnhancers);

export default store;
