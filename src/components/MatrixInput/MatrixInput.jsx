import React from "react";
import PropTypes from "prop-types";

const mapInputArrayToDomArray = (dispatcher) => (numberOfNodes) =>  (value, index) =>
{
    const y = index%numberOfNodes;
    const x = Math.floor(index/numberOfNodes);
    return (<input key={index} onChange={(e) => dispatcher(index)(e.currentTarget.value)} value={value} disabled={( x === y )}/>)
};

const numberOfColumnsToStyleProp = (cols) => {
    return (new Array(cols)).fill("100px ").reduce((acc,next) => acc+next,'');
};

const MatrixInput = ({matrixData,matrixDispatchers}) =>
{
    const inputs = matrixData.inputs.map(mapInputArrayToDomArray(matrixDispatchers.updateInput)(matrixData.numberOfNodes)) ;

    for(let i =  matrixData.numberOfNodes-1; i >= 0; i--)
    {
        inputs.unshift(<div key={Math.random()*1000}>{i}</div>);
    }
    for(let i = 1; i < matrixData.numberOfNodes+1; i++)
    {
        inputs.splice(i*(matrixData.numberOfNodes+1)-1, 0, <div key={Math.random()*1000}>{i-1}</div>)
    }
    inputs.unshift(<div key={Math.random()*1000}/>);
    const InputStyle = {
        display: "grid",
        gridTemplateColumns: numberOfColumnsToStyleProp(matrixData.numberOfNodes+1)
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
        </div>)
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