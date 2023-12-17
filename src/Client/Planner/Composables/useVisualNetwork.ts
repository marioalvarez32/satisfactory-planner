import cytoscape from 'cytoscape';
import cytoscapeDomNode from 'cytoscape-dom-node';
import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';

import cytoscapeNgraph from 'cytoscape-ngraph.forcelayout';
import { ref, toRefs } from 'vue';
import { NetworkLayoutOptions } from '../Models/NetworkLayoutOptions';
import { useNetworkOptions } from '../Stores/networkOptions';
import { useNetworkDataStore } from '../Stores/networkData';
import { useDebounceFn } from '@vueuse/core';

type Config = {
  elementId: string;
};
const selectedNode = ref(null);
let networkInstance;
export function useVisualNetwork(elementId?: string) {
  let isLayoutReady = false;
  cytoscape.use(cytoscapeDomNode);
  cytoscape.use(dagre);
  cytoscape.use(klay);

  function initializeNetwork() {
    isLayoutReady = false;
    if (networkInstance) networkInstance.destroy();
    networkInstance = cytoscape({
      container: document.getElementById(elementId), // container to render in
      elements: [],
      layout: diagramLayout,
    });

    // Initialize cytoscape plugins
    networkInstance.domNode();

    networkInstance.on('select', function (event) {
      selectedNode.value = event.target._private.data;
    });

    networkInstance.on('unselect', function (event) {
      selectedNode.value = null;
    });

    const nodePositionStore = useNetworkDataStore();
    const debouncedSaveNodePosition = useDebounceFn(nodePositionStore.saveNodePosition, 150);

    networkInstance.on('position', 'node', function (event) {
      if (isLayoutReady) {
        const node = event.target;
        debouncedSaveNodePosition(node);
      }
    });

    updateNetworkStyle();
  }

  function updateNetwork(nodes, edges) {
    initializeNetwork();
    networkInstance.add(nodes);
    networkInstance.add(edges.filter((edge) => networkInstance.$id(edge.data.source).length > 0 && networkInstance.$id(edge.data.target).length > 0));
    networkInstance.edges().forEach((edge) => {
      edge.addClass(`edge--${edge.data.EdgeColor}`);
    });

    updateNetworkLayout();
  }

  function updateNetworkLayout() {
    const { networkLayout } = toRefs(useNetworkOptions());
    if (!networkLayout.value) return;
    networkLayout.value.ready = () => {
      isLayoutReady = false;
    };
    networkLayout.value.stop = () => {
      isLayoutReady = true;
      restoreNodePositions();
    };
    networkInstance.layout(networkLayout.value).run();
  }

  function updateNetworkStyle() {
    const { networkStyle } = useNetworkOptions();
    if (!networkStyle) return;
    edgeCssProperties['curve-style'] = networkStyle.curveStyle;
    networkInstance.style(getNetworkStyles());
  }

  function restoreNodePositions() {
    networkInstance.batch(function () {
      networkInstance.nodes().forEach(function (node) {
        const id = node.id();
        const { getNodePositionById } = toRefs(useNetworkDataStore());

        const nodePosition = getNodePositionById.value(id);
        if (nodePosition) {
          node.position({ x: nodePosition.X, y: nodePosition.Y });
        }
      });
    });
  }

  return {
    initializeNetwork,
    updateNetwork,
    updateNetworkLayout,
    selectedNode,
    updateNetworkStyle,
  };
}

const diagramLayout = new NetworkLayoutOptions();

const edgeCssProperties = {
  'curve-style': 'bezier', // taxi for hierarchy. bezier for straight lines. unbundled-bezier for curved lines.
  'taxi-direction': 'downward',
  'control-point-step-size': 100,
  'target-arrow-shape': 'triangle',
  'arrow-scale': 1.7,
  'target-arrow-color': (ele) => {
    return getEdgeColor(ele._private.data.EdgeColor);
  },
  'line-color': (ele) => {
    return getEdgeColor(ele._private.data.EdgeColor);
  },
  width: 4,
  'text-wrap': 'wrap',
  color: 'white',
  'text-rotation': 'autorotate',
  'text-background-opacity': 1,
  'text-background-color': '#1a2331',
  label: 'data(label)',
};

function getNetworkStyles() {
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
    .selector('edge[EdgeType="Item-Relation"]')
    .css(edgeCssProperties)
    .selector('edge[EdgeType="Byproduct-Item"]')
    .css({
      ...edgeCssProperties,
      'line-style': 'dashed',
    })
    .selector('edge:active')
    .css({
      'overlay-color': '#e59344', // Color of the box
      'overlay-opacity': '0',
    });

  return diagramStyle;
}

function getEdgeColor(edgeColor) {
  switch (edgeColor) {
    case 'iron':
      return '#B87333';
    case 'copper':
      return '#fa6a17';
    case 'quartz':
      return '#f5aad7 ';
    case 'coal':
      return '#333333 ';
    case 'oil':
      return '#1C1C1C ';
    case 'steel':
      return '#5A7D9A ';
    case 'limestone':
      return '#EDE7D9 ';
    case 'caterium':
      return '#FFD700 ';
    default:
      return 'gray';
  }
}

const layeredOptions = {
  elk: {
    edgeRouting: 'ORTHOGONAL', // Possible values: ORTHOGONAL | POLYLINE | SPLINES, style of edge routing
    fixedAlignment: 'LEFTUP', // Possible values: NONE | LEFTUP | RIGHTDOWN | BALANCED, alignment of fixed nodes
    hierarchyHandling: 'SEPARATE_CHILDREN', // Possible values: INCLUDE_CHILDREN | SEPARATE_CHILDREN, handling of hierarchical structures
    layoutHierarchy: false, // Boolean value: true | false, whether to layout hierarchical structures
    separateConnectedComponents: false, // Boolean value: true | false, whether to separate connected components
    debug: true,
    algorithm: 'layered',
    direction: 'DOWN',

    'spacing.componentComponent': '100f',
    'layered.mergeEdges': false,
    'layered.unnecessaryBendpoints': false,
    'layered.compaction.connectedComponents': false,
    'layered.considerModelOrder.strategy': 'NODES_AND_EDGES', // NODES_AND_EDGES | PREFER_EDGES | PREFER_NODES
    'layered.considerModelOrder.components': 'MODEL_ORDER',

    // stuff
    'layered.layering.strategy': 'NETWORK_SIMPLEX', // Possible values: NETWORK_SIMPLEX | LONGEST_PATH | INTERACTIVE | COFFMAN_GRAHAM
    'layered.inLayerSpacingFactor': 1.0, //IDK Numeric value, spacing factor between nodes within the same layer
    'layered.mergeHierarchyEdges': false, // Boolean value: true | false, whether to merge edges that cross hierarchy boundaries
    'layered.nodePlacement.bk.fixedAlignment': 'BALANCED', // Possible values: BALANCED | LEFTUP | RIGHTDOWN | NONE
    'layered.spacing.baseValue': 0, // Numeric value, the base value for spacing
    'layered.spacing.edgeEdgeBetweenLayers': 10, // Numeric value, spacing between edges in different layers
    'layered.spacing.edgeNodeBetweenLayers': 50, // Numeric value, spacing between edges and nodes in different layers
    'layered.spacing.nodeNodeBetweenLayers': 10, // Numeric value, spacing between nodes in different layers
    'layered.thoroughness': 10, // Numeric value, thoroughness of the algorithm,
    'layered.highDegreeNodes.treeHeight': 100,
  },
};
