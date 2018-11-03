const defaultState = {
    numberOfNodes: 2,
    inputs: [0,0,0,0]
};

export const matrixActionTypes = {
    updateInput: 'MATRIX_UPDATE_INPUT',
    updateMatrixSize: 'MATRIX_UPDATE_NUMBER_OF_NODES'
};

 const reducer = matrixActionTypes => (state = defaultState, action) =>
{
    switch (action.type)
    {
        case matrixActionTypes.updateMatrixSize:
            return {
                ...state,
                numberOfNodes: state.numberOfNodes + action.payload,
                inputs: (new Array((state.numberOfNodes + action.payload)*(state.numberOfNodes + action.payload))).fill(0)
            };
        case matrixActionTypes.updateInput:
            const newInput = [...state.inputs];
            newInput[action.payload.index] = action.payload.value;
            return {
                ...state,
                inputs: newInput
            };
    }
    return state;
};


export default reducer(matrixActionTypes);