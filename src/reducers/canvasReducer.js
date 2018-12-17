import cloneDeep from 'lodash.clonedeep'

export const canvasActionTypes = {
    setRef: 'CANVAS_SET_REF'
}

const defaultState = {
    ref: null,
    ctx: null,
}

const canvasReducer = (types) => (state = defaultState, action) =>
{
    switch (action.type)
    {
        case types.setRef:
            return {
                ...cloneDeep(state),
                ref: action.payload,
                ctx: action.payload.getContext('2d')
            }
    }
    return state
}
export default canvasReducer(canvasActionTypes)