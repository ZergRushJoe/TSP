import { createStore, applyMiddleware, compose } from 'redux';

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);

export default createStore(reducer,composeEnhancers(middleware));
