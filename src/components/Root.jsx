import React from "react";
import { connect } from "react-redux";
import {CalcCost, UpdateInputAction, UpdateMatrixSize} from "../actions/MaxtrixActions";
import MatrixInput from "./MatrixInput/MatrixInput.jsx"
import {addNode, setRef} from "../actions/CanvasActions";



const _Root = ({path,matrixData,matrixDispatchers,calcCost,canvasDispatchers,canvasData}) => {
    return (
        <div>
            <MatrixInput matrixData={matrixData} matrixDispatchers={matrixDispatchers}/>
            <button onClick={() => calcCost(matrixData.inputs)}>Calculate</button><br/>
            <div>
                Optimum: {matrixData.optimum} <br/>
                Kruskal: {matrixData.approx}
            </div>
            <canvas ref={ref => canvasDispatchers.set(canvasData.ref)(ref)}
                    style={{width:500,height:500}}
                    onClick={ e => canvasDispatchers.clickEvent(canvasData.ctx)(canvasData.ref)(e) }/>
        </div>)
};

const mapStateToProps = state =>
({
    matrixData: {
        numberOfNodes: state.matrix.numberOfNodes,
        inputs: state.matrix.inputs,
        optimum: state.matrix.optimum,
        approx: state.matrix.approx,
    },
    canvasData: {
        ref: state.canvas.ref,
        ctx: state.canvas.ctx
    }

});

const mapDispatchToProps = dispatch =>
({
    matrixDispatchers: {
        updateNodeSize: UpdateMatrixSize(dispatch),
        updateInput: UpdateInputAction(dispatch)
    },
    calcCost: CalcCost(dispatch),
    canvasDispatchers: {
        set: setRef(dispatch),
        clickEvent: addNode(dispatch)
    }
});

const Root = connect(mapStateToProps,mapDispatchToProps)(_Root);

export default Root;