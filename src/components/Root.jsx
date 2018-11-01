import React from "react";
import { connect } from "react-redux";
import {UpdateInputAction} from "../actions/MaxtrixActions";

const _Root = ({path,matrixInput,updateInput}) => {
    return (
        <div>
            <button onClick={updateInput('hello')}>
                click me
            </button>
            <div>
                {matrixInput}
            </div>
        </div>
        )
};

const mapStateToProps = state =>
({
    path: state.route.path,
    matrixInput: state.matrix.input
});

const mapDispatchToProps = dispatch =>
({
    updateInput: UpdateInputAction(dispatch)
});

const Root = connect(mapStateToProps,mapDispatchToProps)(_Root);

export default Root;