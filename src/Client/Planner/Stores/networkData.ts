import { defineStore } from 'pinia';
import { ProductionList, ProductionListItem } from '../Models/ProductionList';
import { NetworkPan, NodePosition, Position, SavedUserTabData } from '../Models/SavedUserTabData';
import { CytoscapePosition } from '../Models/CytoscapeModels';

import { useProductionListStore } from './productionList';
import { toRefs } from 'vue';

type State = {
  savedUserTabData: SavedUserTabData[];
};
export const useNetworkDataStore = defineStore('network-data-store', {
  state: (): State => ({
    savedUserTabData: [],
  }),
  getters: {
    getNodePositionById: (state) => (nodeId: string) => {
      const { selectedListId } = toRefs(useProductionListStore());
      const listIndex = state.savedUserTabData.findIndex((savedUserTabData) => savedUserTabData.TabId === selectedListId.value);
      if (listIndex != -1) {
        return state.savedUserTabData.at(listIndex).Nodes.find((savedUserTabData) => savedUserTabData.NodeId === nodeId);
      }
      return null;
    },
    getTabIndex(state): number {
      const { selectedListId } = toRefs(useProductionListStore());
      const tabIndex = this.savedUserTabData.findIndex((savedUserTabData) => savedUserTabData.TabId === selectedListId.value);

      return tabIndex != -1 ? tabIndex : null;
    },
    getNetworkPan(state): NetworkPan {
      return state.savedUserTabData[this.getTabIndex]?.NetworkPan ?? null;
    },
  },
  actions: {
    addUserTabData(): number {
      const { selectedListId } = toRefs(useProductionListStore());

      this.savedUserTabData.push(new SavedUserTabData(selectedListId.value));
      return this.savedUserTabData.length - 1;
    },
    saveNodePosition(node) {
      const nodeId = node.id();
      const nodePosition = node.position();

      const listIndex = this.getTabIndex ?? this.addUserTabData();

      const nodePositionIndex = this.savedUserTabData[listIndex].Nodes.findIndex((node) => nodeId == node.NodeId);
      if (nodePositionIndex == -1) {
        this.savedUserTabData[listIndex].Nodes.push(new NodePosition(nodeId, nodePosition));
      } else {
        this.savedUserTabData[listIndex].Nodes[nodePositionIndex].Position = new Position(nodePosition.x, nodePosition.y);
      }
    },
    saveNetworkPan(position: CytoscapePosition, zoom: number) {
      const listIndex = this.getTabIndex ?? this.addUserTabData();
      const networkPan = new NetworkPan(position, zoom);
      this.savedUserTabData[listIndex].NetworkPan = networkPan;
    },
  },
});
