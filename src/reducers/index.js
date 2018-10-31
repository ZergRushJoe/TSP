import { combineReducers } from "redux";

import routeReducer from './RouteReducer';

export default combineReducers({
    route: routeReducer
});
