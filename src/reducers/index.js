import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import user from "./user";
import article from "./article";

const allReducers = combineReducers({
  user: user,
  article: article
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers, allStoreEnhancers);

export default store;
