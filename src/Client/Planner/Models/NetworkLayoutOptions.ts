export class NetworkLayoutOptions {
  name: string;
  nodeSep: number;
  edgeSep: number;
  rankSep: number;
  rankDir: 'TB' | 'LR';
  align: 'UL' | 'UR' | 'DL' | 'DR';
  ranker: 'network-simplex' | 'tight-tree' | 'longest-path';
  fit: boolean;
  padding: number;
  spacingFactor: number;
  nodeDimensionsIncludeLabels: boolean;

  constructor() {
    this.name = defaultLayoutOptions.name;
    this.fit = defaultLayoutOptions.fit;
    this.rankDir = defaultLayoutOptions.rankDir;
    this.padding = defaultLayoutOptions.padding;
    this.rankSep = defaultLayoutOptions.rankSep;
    this.edgeSep = defaultLayoutOptions.edgeSep;
    this.nodeSep = defaultLayoutOptions.nodeSep;
    this.ranker = defaultLayoutOptions.ranker;
    this.align = defaultLayoutOptions.align;
    this.spacingFactor = defaultLayoutOptions.spacingFactor;
    this.nodeDimensionsIncludeLabels = defaultLayoutOptions.nodeDimensionsIncludeLabels;
  }
}

export const defaultLayoutOptions: NetworkLayoutOptions = {
  name: 'dagre',
  fit: true,
  rankDir: 'TB',
  padding: 150,
  rankSep: 175,
  edgeSep: 175,
  nodeSep: 100,
  ranker: 'longest-path',
  align: 'UL',
  spacingFactor: undefined,
  nodeDimensionsIncludeLabels: false,
};

export const rankDirOptions = [
  {
    value: 'TB',
    title: 'Top to Bottom',
  },
  {
    value: 'LR',
    title: 'Left to Right',
  },
];

export const alignmentOptions = [
  {
    value: 'UL',
    title: 'Up Left',
  },
  {
    value: 'UR',
    title: 'Up Right',
  },
  {
    value: 'DL',
    title: 'Down Left',
  },
  {
    value: 'DR',
    title: 'Down Right',
  },
];

export const rankerOptions = [
  {
    value: 'network-simplex',
    title: 'Network simplex',
  },
  {
    value: 'tight-tree',
    title: 'Tight Tree',
  },
  {
    value: 'longest-path',
    title: 'Longest Path',
  },
];
