const defaultState = {
    input: '',

};

export default function(state = defaultState, action)
{
    switch (action.type)
    {
        case 'UPDATE_INPUT':
            return {
                ...state,
                input: action.payload
            }
    }
    return state;
}