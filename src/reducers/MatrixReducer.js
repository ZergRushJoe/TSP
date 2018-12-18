const defaultState = {
    numberOfNodes: 2,
    inputs: [0,0,0,0],
    optimum: 0,
    approx: 0,
};

export const matrixActionTypes = {
    updateInput: 'MATRIX_UPDATE_INPUT',
    updateMatrixSize: 'MATRIX_UPDATE_NUMBER_OF_NODES',
    calcOptimumCost: 'MATRIX_OPTIMUM_CAL_COST',
    calcApproxCost: 'MATRIX_APPROX_CAL_COST',
};

 const reducer = matrixActionTypes => (state = defaultState, action) =>
{
    switch (action.type)
    {
        case matrixActionTypes.calcOptimumCost:
            return {
                ...state,
                inputs: [...state.inputs],
                optimum: action.payload
            };
        case matrixActionTypes.calcApproxCost:
            return {
                ...state,
                inputs: [...state.inputs],
                approx: action.payload
            };
        case matrixActionTypes.updateMatrixSize:
            return {
                ...state,
                numberOfNodes: state.numberOfNodes + action.payload,
                inputs: (new Array((state.numberOfNodes + action.payload)*(state.numberOfNodes + action.payload))).fill(0)
            };
        case matrixActionTypes.updateInput:
            const newInput = [...state.inputs];
            newInput[action.payload.index] = action.payload.value;
            const x = Math.floor(action.payload.index/state.numberOfNodes);
            const y = action.payload.index % state.numberOfNodes;
            const mirrorIndex = y*state.numberOfNodes + x;
            newInput[mirrorIndex] = action.payload.value;
            return {
                ...state,
                inputs: newInput
            };
    }
    return state;
};


export default reducer(matrixActionTypes);