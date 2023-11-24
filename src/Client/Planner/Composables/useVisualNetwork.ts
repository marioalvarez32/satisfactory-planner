import cytoscape from 'cytoscape';
import cytoscapeDomNode from 'cytoscape-dom-node';
import dagre from 'cytoscape-dagre';

import cytoscapeNgraph from 'cytoscape-ngraph.forcelayout';

type Config = {
  elementId: string;
};
export function useVisualNetwork(elementId: string) {
  cytoscape.use(cytoscapeDomNode);
  cytoscape.use(dagre);
  cytoscape.use(cytoscapeNgraph);
  let networkInstance;

  function initializeNetwork() {
    if (networkInstance) networkInstance.destroy();
    networkInstance = cytoscape({
      container: document.getElementById(elementId), // container to render in
      elements: [],
      style: diagramStyle,
      layout: diagramLayout,
    });

    // Initialize cytoscape plugins
    networkInstance.domNode();
  }

  function updateNetwork(nodes, edges) {
    initializeNetwork();
    networkInstance.add(nodes);
    networkInstance.add(edges.filter((edge) =>  (networkInstance.$id(edge.data.source).length > 0)))
    networkInstance.edges().forEach(edge => {
      edge.addClass(`edge--${edge.data.EdgeColor}`);
    });
    networkInstance.layout(diagramLayout).run();
  }

  return {
    initializeNetwork,
    updateNetwork,
  };
}

const diagramLayout = {
  name: 'dagre',
  avoidOverlap: true,
  fit: true,
  rankDir: 'UL',
  idealEdgeLength: 10,
  padding: 150,
  rankSep: 175,
  nodeSep: 100,
};

const diagramStyle = cytoscape
  .stylesheet()
  .selector(':selected')
  .css({
    'background-color': '#2FC25B',
  })
  .selector('node:active')
  .css({
    'overlay-color': '#e59344',
    'overlay-padding': '12px',
  })
  .selector('node')
  .css({
    width: 75,
    height: 60,
    'background-opacity': '0',
    'border-width': 0,
  })
  .selector('edge')
  .css({
    'curve-style': 'bezier',
    'control-point-step-size': 100,
    'target-arrow-shape': 'triangle',
    'arrow-scale': 1.7,
    'target-arrow-color': (ele) => {
      return getEdgeColor(ele._private.data.EdgeType);
    },
    'line-color': (ele) => {
      return getEdgeColor(ele._private.data.EdgeType);
    },
    width: 4,
    'text-wrap': 'wrap',
    color: 'white',
    'text-rotation': 'autorotate',
    'text-background-opacity': 1,
    'text-background-color': '#202c3d',
    label: 'data(label)',
  })
  .selector('edge:active')
  .css({
    'overlay-color': '#e59344', // Color of the box
    'overlay-opacity': '0',
  });


  function getEdgeColor(edgeType){
    switch(edgeType){
      case 'iron': 
        return '#B87333';
      case 'copper': 
        return '#fa6a17';
      default: 
        return 'gray';
    }
  }