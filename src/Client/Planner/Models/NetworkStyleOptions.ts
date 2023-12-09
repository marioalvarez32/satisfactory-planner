export class NetworkStyleOptions {
  curveStyle: string;

  constructor() {
    this.curveStyle = defaultStyleOptions.curveStyle;
  }
}

export const defaultStyleOptions: NetworkStyleOptions = {
  curveStyle: 'bezier',
};

export const curveStyleOptions = [
  {
    value: 'bezier',
    title: 'Bezier',
  },
  {
    value: 'taxi',
    title: 'Hierarchical',
  },
  {
    value: 'unbundled-bezier',
    title: 'Curved Lines',
  },
];
