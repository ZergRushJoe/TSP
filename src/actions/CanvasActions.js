

export const setRef = dispatch => oldRef => ref => {
    if(ref != null && oldRef == null)
        dispatch({type:'CANVAS_SET_REF',payload:ref})
    else
        console.log('no ref');
}

export const addNode = dispatch => ctx => ref => e => {
    let x;
    let y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= ref.offsetLeft;
    y -= ref.offsetTop;
    console.log(x,y)
}