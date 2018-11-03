
import { matrixActionTypes } from '../reducers/MatrixReducer.js';

export const UpdateMatrixSize = dispatch => amount => {
        dispatch({type:matrixActionTypes.updateMatrixSize, payload:amount});
};

export const UpdateInputAction = dispatch => index => value =>
{
        dispatch({type:matrixActionTypes.updateInput,payload:{index:index, value: value}});
};