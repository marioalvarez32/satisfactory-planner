export class NodePositionData {
  ListId: string;
  Nodes: NodePosition[];

  constructor(id: string) {
    this.ListId = id;
    this.Nodes = [];
  }
}

export class NodePosition {
  NodeId: string;
  X: number;
  Y: number;

  constructor(nodeId: string, x: number, y: number) {
    this.NodeId = nodeId;
    this.X = x;
    this.Y = y;
  }
}
