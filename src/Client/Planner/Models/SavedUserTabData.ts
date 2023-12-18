import { CytoscapePosition } from './CytoscapeModels';

export class SavedUserTabData {
  TabId: string;
  Nodes: NodePosition[];
  NetworkPan: NetworkPan;

  constructor(id: string) {
    this.TabId = id;
    this.Nodes = [];
    this.NetworkPan = new NetworkPan();
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

export class NetworkPan {
  Position: Position;
  Zoom: number;

  constructor(cytoscapePosition?: CytoscapePosition, zoom?: number) {
    this.Position = cytoscapePosition ? new Position(cytoscapePosition.x, cytoscapePosition.y) : null;
    this.Zoom = zoom ?? null;
  }
}

export class Position {
  X: number;
  Y: number;

  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }

  static convertToCytoscapePosition(position: Position): CytoscapePosition {
    return { x: position.X, y: position.Y };
  }
}
