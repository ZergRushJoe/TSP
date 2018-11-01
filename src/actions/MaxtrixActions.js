


export const UpdateInputAction = dispatch => input  => () =>
{
    dispatch({type:'UPDATE_INPUT',payload:input});
};