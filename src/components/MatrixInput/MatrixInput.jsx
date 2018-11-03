import React from "react";
import PropTypes from "prop-types";

const mapInputArrayToDomArray = (dispatcher) => (value, index) =>
{
    return (<input key={index} onChange={(e) => dispatcher(index)(e.currentTarget.value)} value={value}/>)
};

const numberOfColumnsToStyleProp = (cols) => {
    return (new Array(cols)).fill("100px ").reduce((acc,next) => acc+next,'');
};

const MatrixInput = ({matrixData,matrixDispatchers}) =>
{
    const inputs = matrixData.inputs.map(mapInputArrayToDomArray(matrixDispatchers.updateInput)) ;
    const InputStyle = {
        display: "grid",
        gridTemplateColumns: numberOfColumnsToStyleProp(matrixData.numberOfNodes)
    };
    return (
        <div>
            <div>
                Number of Nodes: {matrixData.numberOfNodes}
                <button onClick={() => matrixDispatchers.updateNodeSize(1)}>Rise</button>
                <button onClick={() => matrixDispatchers.updateNodeSize(-1)}>lower</button>
            </div>
            <div style={InputStyle}>
                {inputs}
            </div>
        </div>
        )
};



MatrixInput.propTypes = {
    matrixData: PropTypes.shape(
        {
            numberOfNodes: PropTypes.number,
            inputs: PropTypes.array
        }),
    matrixDispatchers:  PropTypes.shape(
        {
            updateNodeSize: PropTypes.func,
            updateInput: PropTypes.func
        })
};

export default MatrixInput;