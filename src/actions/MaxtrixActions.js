
import { matrixActionTypes } from '../reducers/MatrixReducer.js';

const calcOptimum = dispatch => matrix =>
{
    //run calculation here
    dispatch({type:matrixActionTypes.calcOptimumCost,payload:1});
};

const calcApprox = dispatch => matrix =>
{
    // run calculation here
    dispatch({type:matrixActionTypes.calcApproxCost,payload:1});
};

export const CalcCost = dispatch => matrix => {
    calcOptimum(dispatch)(matrix);
    calcApprox(dispatch)(matrix);
};


export const UpdateMatrixSize = dispatch => amount => {
        dispatch({type:matrixActionTypes.updateMatrixSize, payload:amount});
};

export const UpdateInputAction = dispatch => index => value =>
{
        dispatch({type:matrixActionTypes.updateInput,payload:{index:index, value: value}});
};