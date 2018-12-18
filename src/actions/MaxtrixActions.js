import {matrixActionTypes} from '../reducers/MatrixReducer.js'

const factorial = num =>
{
    let val = 1
    for (let i = 2; i <= num; i++)
    {
        val = val * i;
    }
    return val;
};
const swap = (a, i, j) =>
{
    const newArray = [...a];
    const temp = a[i];
    newArray[i] = newArray[j];
    newArray[j] = newArray[i];
    return newArray;
};
const isConnected = (matrix) => (node1, node2) =>
{
    if(!node2)
        return false;
    return matrix[node1][node2] !== 0;
};
const validPath = (isConnected) => (pathSet) => (matrix) =>
{
    return pathSet.map((v, i) =>
    {
        return (pathSet.length > i + 2) ? [v, pathSet[i + 1]] : null;
    }).reduce((acc, curr) =>
    {
        if (curr)
        {
            const connected = isConnected(matrix)(curr[0], curr[1]);
            return acc && connected;
        }
        return acc;
    }, true);
};
const calcOptimum = dispatch => matrix =>
{
    //run calculation here
    const numberOfNodes = Math.sqrt(matrix.length);
    const transformedArray = matrix.reduce((acc, next, index) =>
    {
        if (index % numberOfNodes === 0)
            acc.push([next]);
        else
            acc[Math.floor(index / numberOfNodes)].push(next);
        return acc;
    }, []);// 1d array to 2d array

    const formattedMatrix = transformedArray.map(i => i.map(j => parseInt(j)));//format strings to ints
    let pathSet = (new Array(numberOfNodes)).fill(0).map((v, i) => i);
    const numberOfPerms = factorial(numberOfNodes);
    let bestCost = null;
    for (let i = 0; i < numberOfPerms; i++)
    {
        if (validPath(isConnected)(pathSet)(formattedMatrix))
        {
            const cost = pathSet.map((v, i) =>
            {
                return (pathSet.length > i + 2) ? [v, pathSet[i + 1]] : null;
            }).reduce((acc, curr) =>
            {
                return curr ? acc + formattedMatrix[curr[0]][curr[1]] : acc;
            }, 0);
            if (bestCost == null)
                bestCost = cost;
            else if (bestCost > cost)
                bestCost = cost;
        }
        let largestIndex = pathSet.reduce((acc, curr) => acc < curr ? curr : acc, -1);
        let nextLargest = pathSet.reduce((acc, curr) => pathSet[largestIndex] > curr ? curr : -1, -1);
        pathSet = swap(pathSet, largestIndex, nextLargest);

    }
    dispatch({type: matrixActionTypes.calcOptimumCost, payload: bestCost * 2});
};

const calcApprox = dispatch => matrix =>
{

    let kruskalResult = kruskal(createEdges(matrix));

    //tree traversal and cost calculation for TSP here
    let mst = JSON.stringify(kruskalResult);
    let tspCost = GetApproxCost(kruskalResult);
    dispatch({type: matrixActionTypes.calcApproxCost, payload: tspCost})
}

//Kruskal's algorithm to construct a MST
//Loop over edges
let kruskal = edges =>
{
    edges.sort(function (a, b)
    {
        return a.weight - b.weight
    })

    let mst = {}

    for (let edge of edges)
    {
        let startNode = edge.firstNode
        if (mst[startNode] == null)
        {
            mst[startNode] = []
        }
        let endNode = edge.secondNode

        if (mst[endNode] == null)
        {
            mst[endNode] = []
        }
    }

    //Copies MST to create a temp MST to check for cycles
    //If there are no cycles, it pushes each node to the final MST
    for (let edge of edges)
    {
        let startNode = edge.firstNode
        let endNode = edge.secondNode
        let _mst = JSON.parse(JSON.stringify(mst))
        let _node = {node: edge.secondNode, weight: edge.weight}
        let _node2 = {node: edge.firstNode, weight: edge.weight}
        _mst[startNode].push(_node)
        _mst[endNode].push(_node2)
        let noCycles = !findCycle(_mst)

        if (noCycles)
        {
            mst[startNode].push(_node)
        }
    }
    return mst
}

//Converts matrix into an array of edges
let createEdges = matrix =>
{
    let edges = [];
    let size = Math.sqrt(matrix.length);
    let matrixEntries = matrix.entries();

    for (let [i, el] of matrixEntries)
    {
        if (el > 0)
        {
            let first = Math.floor(i / size);
            let second = i % size;
            edges.push({firstNode: first, secondNode: second, weight: el})
        }
    }
    return edges;
}
//Calls recursive function isCycle to loop and check nodes
let findCycle = graph =>
{
    let nodes = Object.keys(graph);
    let checked = {};

    for (let node of nodes)
    {
        if (!checked[node])
        {
            if (isCycle(node, checked, '', graph))
            {
                return true
            }
        }
    }
    return false;
};

let isCycle = (node, checked, parent, graph) =>
{
    checked[node] = true
    let nearNodes = graph[node]

    for (let nearNode of nearNodes)
    {
        if (!checked[nearNode.node])
        {
            if (isCycle(nearNode.node, checked, node, graph))
            {
                return true
            }
        } else if (nearNode.node != parent)
        {
            return true
        }
    }
    return false
}

//Approximate Algorithm
//Get cost by iterting through each node and grabbing cost
let GetApproxCost = mst =>
{
    let total = 0
    let nodes = Object.keys(mst)
    for (let node of nodes)
    {
        let values = mst[node]
        for (let _node of values)
        {
            total = total + parseInt(_node.weight)
        }
    }
    return total * 2;
}

export let CalcCost = dispatch => matrix =>
{
    calcOptimum(dispatch)(matrix);
    calcApprox(dispatch)(matrix);
}

export let UpdateMatrixSize = dispatch => amount =>
{
    dispatch({type: matrixActionTypes.updateMatrixSize, payload: amount});
}

export let UpdateInputAction = dispatch => index => value =>
{
    dispatch({type: matrixActionTypes.updateInput, payload: {index: index, value: value}});
}