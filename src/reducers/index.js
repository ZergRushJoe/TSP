import { combineReducers } from "redux"

import matrixReducer from "./MatrixReducer"
import canvasReducer from "./canvasReducer"

export default combineReducers({
    matrix: matrixReducer,
    canvas: canvasReducer
})
