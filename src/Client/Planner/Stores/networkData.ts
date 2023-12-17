import { defineStore } from 'pinia';
import { ProductionList, ProductionListItem } from '../Models/ProductionList';
import { NodePosition, NodePositionData } from '../Models/NodePositionData';
import { useProductionListStore } from './productionList';
import { toRefs } from 'vue';

type State = {
  nodePositions: NodePositionData[];
};
export const useNetworkDataStore = defineStore('network-data-store', {
  state: (): State => ({
    nodePositions: [],
  }),
  getters: {
    getNodePositionById: (state) => (nodeId: string) => {
      const { selectedListId } = toRefs(useProductionListStore());
      const listIndex = state.nodePositions.findIndex((nodePositions) => nodePositions.ListId === selectedListId.value);
      if (listIndex != -1) {
        return state.nodePositions.at(listIndex).Nodes.find((nodePosition) => nodePosition.NodeId === nodeId);
      }
      return null;
    },
  },
  actions: {
    saveNodePosition(node) {
      const nodeId = node.id();
      const nodePosition = node.position();

      const { selectedListId } = toRefs(useProductionListStore());

      let listIndex = this.nodePositions.findIndex((nodePositions) => nodePositions.ListId === selectedListId.value);

      if (listIndex == -1) {
        this.nodePositions.push(new NodePositionData(selectedListId.value));
        listIndex = this.nodePositions.length - 1;
      }

      const nodePositionIndex = this.nodePositions[listIndex].Nodes.findIndex((node) => nodeId == node.NodeId);
      if (nodePositionIndex == -1) {
        this.nodePositions[listIndex].Nodes.push(new NodePosition(nodeId, nodePosition.x, nodePosition.y));
      } else {
        this.nodePositions[listIndex].Nodes[nodePositionIndex].X = nodePosition.x;
        this.nodePositions[listIndex].Nodes[nodePositionIndex].Y = nodePosition.y;
      }
    },
  },
});
