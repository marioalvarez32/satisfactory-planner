import cytoscape from 'cytoscape';
import cytoscapeDomNode from 'cytoscape-dom-node';
import dagre from 'cytoscape-dagre';

import cytoscapeNgraph from 'cytoscape-ngraph.forcelayout';
import { diagramStyle, diagramLayout } from '../Utilities/NetworkConfig';

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
    networkInstance.layout(diagramLayout).run();
  }

  return {
    initializeNetwork,
    updateNetwork,
  };
}
