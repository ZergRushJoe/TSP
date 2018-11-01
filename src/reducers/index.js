import { combineReducers } from "redux";

import routeReducer from './RouteReducer';
import MatrixReducer from "./MatrixReducer";

export default combineReducers({
    route: routeReducer,
    matrix: MatrixReducer
});
