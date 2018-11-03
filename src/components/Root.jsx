import React from "react";
import { connect } from "react-redux";
import {UpdateInputAction, UpdateMatrixSize} from "../actions/MaxtrixActions";
import MatrixInput from "./MatrixInput/MatrixInput.jsx"



const _Root = ({path,matrixData,matrixDispatchers}) => {
    return (
        <div>
            <MatrixInput matrixData={matrixData} matrixDispatchers={matrixDispatchers}/>
        </div>)
};

const mapStateToProps = state =>
({
    matrixData: {
        numberOfNodes: state.matrix.numberOfNodes,
        inputs: state.matrix.inputs
    }
});

const mapDispatchToProps = dispatch =>
({
    matrixDispatchers: {
        updateNodeSize: UpdateMatrixSize(dispatch),
        updateInput: UpdateInputAction(dispatch)
    }
});

const Root = connect(mapStateToProps,mapDispatchToProps)(_Root);

export default Root;