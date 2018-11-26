import { matrixActionTypes } from '../reducers/MatrixReducer.js'

let calcOptimum = dispatch => matrix => {
  dispatch({ type: matrixActionTypes.calcOptimumCost, payload: 1 })
}

const calcOptimum = dispatch => matrix =>
{
    //run calculation here
    const numberOfNodes =  Math.sqrt(matrix.length);
    const transformedArray = matrix.reduce( (acc,next,index) =>
    {
        if(index%numberOfNodes === 0)
            acc.push([next]);
        else
            acc[Math.floor(index/numberOfNodes)].push(next);
        return acc;
    },[]);

    const formattedMatrix = transformedArray.map(i => i.map(j => parseInt(j)));

    

    console.log(formattedMatrix);

    dispatch({type:matrixActionTypes.calcOptimumCost,payload:1});
};
let calcApprox = dispatch => matrix => {

  let kruskalResult = kruskal(createEdges(matrix))

  //tree traversal and cost calculation for TSP here
  let mst = JSON.stringify(kruskalResult)
  let tspCost = GetApproxCost(kruskalResult)
  dispatch({ type: matrixActionTypes.calcApproxCost, payload: tspCost })
}

//Kruskal's algorithm to construct a MST
//Loop over edges
let kruskal = edges => {  
  edges.sort(function (a, b) { return a.weight - b.weight })

  let mst = {} 

  for (let edge of edges) {
    let startNode = edge.firstNode
    if (mst[startNode] == null) {
      mst[startNode] = []
    }
    let endNode = edge.secondNode

    if (mst[endNode] == null) {
      mst[endNode] = []
    }
  }

  //Copies MST to create a temp MST to check for cycles
  //If there are no cycles, it pushes each node to the final MST
  for (let edge of edges) {
    let startNode = edge.firstNode
    let endNode = edge.secondNode
    let _mst = JSON.parse(JSON.stringify(mst))
    let _node = { node: edge.secondNode, weight: edge.weight }
    let _node2 = { node: edge.firstNode, weight: edge.weight }
    _mst[startNode].push(_node)
    _mst[endNode].push(_node2)
    let noCycles = !findCycle(_mst)

    if (noCycles) {
      mst[startNode].push(_node)    
    }
  }
  return mst
}

//Converts matrix into an array of edges
let createEdges = matrix => {
  let edges = []
  let size = Math.sqrt(matrix.length)
  let matrixEntries = matrix.entries()

  for(let [i,el] of matrixEntries){
    if (el > 0) {
      let first = Math.floor(i / size);
      let second = i % size;
      edges.push({ firstNode: first, secondNode: second, weight: el })
    }
  }
  return edges
}
//Calls recursive function isCycle to loop and check nodes
let findCycle = graph => {
  let nodes = Object.keys(graph)
  let checked = {}
  
  for (let node of nodes) {
    if (!checked[node]) {
      if (isCycle(node, checked, '', graph)) {
        return true
      }
    }
  }
  return false
}

let isCycle = (node, checked, parent, graph) => {
  checked[node] = true
  let nearNodes = graph[node]

  for (let nearNode of nearNodes) {
    if (!checked[nearNode.node]) {
      if (isCycle(nearNode.node, checked, node, graph)) {
        return true
      }
    } else if (nearNode.node != parent) {
      return true
    }
  }
  return false
}

//Approximate Algorithm
//Get cost by iterting through each node and grabbing cost
let GetApproxCost = mst => {
  let total = 0
  let nodes = Object.keys(mst)
  for(let node of nodes){
    let values = mst[node]
    for(let _node of values){
      total = total + parseInt(_node.weight)
    }   
  }
  return total
}

export let CalcCost = dispatch => matrix => {
  calcOptimum(dispatch)(matrix);
  calcApprox(dispatch)(matrix);
}

export let UpdateMatrixSize = dispatch => amount => {
  dispatch({ type: matrixActionTypes.updateMatrixSize, payload: amount });
}

export let UpdateInputAction = dispatch => index => value => {
  dispatch({ type: matrixActionTypes.updateInput, payload: { index: index, value: value } });
}