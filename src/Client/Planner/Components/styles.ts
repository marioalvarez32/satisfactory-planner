/*
 * Style and layout of the composition diagrams.
 */

import cytoscape from 'cytoscape';

// http://js.cytoscape.org/#layouts
const diagramLayout = {
  name: 'klay', // todo: choose between dagre and klay, check also BRANDES_KOEPF node placement
  fit: true,

  // dagre - https://github.com/cytoscape/cytoscape.js-dagre
  rankDir: 'TB',
  nodeSep: 40,
  rankSep: 60,

  // klay - https://github.com/cytoscape/cytoscape.js-klay
  klay: {
    direction: 'DOWN',
    thoroughness: 50,
    nodePlacement: 'LINEAR_SEGMENTS',
    cycleBreaking: 'GREEDY',
    spacing: 8,
    inLayerSpacingFactor: 2.0,
    edgeSpacingFactor: 0.2,
    borderSpacing: 10,
  },
  priority: (edge) => Math.round(edge.data('strength')),
};

// see http://js.cytoscape.org/#style
const diagramStyle = cytoscape
  .stylesheet()
  .selector(':selected')
  .css({
    'background-color': '#2FC25B',
  })
  .selector('node:active')
  .css({
    'overlay-color': '#e59344', // Color of the box
    'overlay-padding': '12px',
  })
  .selector('node')
  .css({
    width: 60,
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
    'target-arrow-color': (ele) =>
      ele.data('isAlert') ? 'rgb(204, 0, 51)' : 'rgb(147, 198, 174)',
    'line-color': (ele) =>
      ele.data('isAlert') ? 'rgb(204, 0, 51)' : 'rgb(147, 198, 174)',
    width: 3,
    'text-wrap': 'wrap',
    color: 'rgb(110, 112, 116)',
    'text-rotation': 'autorotate',
    'text-background-opacity': 1,
    'text-background-color': 'white',
    label: 'data(label)',
  })
  .selector('edge:active')
  .css({
    'overlay-color': '#e59344', // Color of the box
    'overlay-opacity': '0',
  });

export { diagramLayout, diagramStyle };
