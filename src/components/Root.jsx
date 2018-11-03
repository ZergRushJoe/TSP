import React from "react";
import { connect } from "react-redux";
import {CalcCost, UpdateInputAction, UpdateMatrixSize} from "../actions/MaxtrixActions";
import MatrixInput from "./MatrixInput/MatrixInput.jsx"



const _Root = ({path,matrixData,matrixDispatchers,calcCost}) => {
    return (
        <div>
            <MatrixInput matrixData={matrixData} matrixDispatchers={matrixDispatchers}/>
            <button onClick={() => calcCost(matrixData.inputs)}>Calculate</button><br/>
            Optimum: {matrixData.optimum} <br/>
            Kruskal: {matrixData.approx}
        </div>)
};

const mapStateToProps = state =>
({
    matrixData: {
        numberOfNodes: state.matrix.numberOfNodes,
        inputs: state.matrix.inputs,
        optimum: state.matrix.optimum,
        approx: state.matrix.approx
    }
});

const mapDispatchToProps = dispatch =>
({
    matrixDispatchers: {
        updateNodeSize: UpdateMatrixSize(dispatch),
        updateInput: UpdateInputAction(dispatch)
    },
    calcCost: CalcCost(dispatch)
});

const Root = connect(mapStateToProps,mapDispatchToProps)(_Root);

export default Root;