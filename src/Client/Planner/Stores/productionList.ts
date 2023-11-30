import { defineStore } from 'pinia';
import { ProductionList, ProductionListItem } from '../Models/ProductionList';
import { Item } from '../Models/Item';
import { getInputTotal, getItemFromId, getOutputTotal } from '../Utilities/ItemUtility';

type State = {
  productionLists: ProductionList[];
  selectedListId: string;
};
export const useProductionListStore = defineStore('production-list-store', {
  state: (): State => ({
    productionLists: [],
    selectedListId: '',
  }),
  getters: {
    getSelectedListIndex(state): number {
      return state.productionLists.findIndex((list) => list.Id == state.selectedListId);
    },
    getSelectedList(state): ProductionList {
      return state.productionLists[this.getSelectedListIndex];
    },
    getSelectedListItems(state): ProductionListItem[] {
      return state.productionLists[this.getSelectedListIndex]?.Items ?? [];
    },
    filteredProductionListItems(state): ProductionListItem[] {
      return this.getSelectedList?.Items.filter((productItem) => productItem.Id != '');
    },
    items(): Item[] {
      return this.filteredProductionListItems?.map((listItem: ProductionListItem) => {
        const item = getItemFromId(listItem.Id);
        item.OutputRate = getOutputTotal(item);
        item.InputRate = getInputTotal(item);
        return item;
      });
    },
    getListItemById:
      (state) =>
      (id: string): ProductionListItem => {
        // Pinia's getters with arguments can't use 'this' and access other getters.
        const selectedList = state.productionLists.find((list) => list.Id == state.selectedListId);
        return selectedList.Items.find((listItem) => listItem.Id == id);
      },
  },
  actions: {
    updateListItem(index: number, newValue: ProductionListItem) {
      this.productionLists[this.getSelectedListIndex].Items[index] = newValue;
    },
    removeSelectedList() {
      const currentIndex = this.getSelectedListIndex;
      this.productionLists.splice(this.getSelectedListIndex, 1);
      this.selectedListId = this.productionLists.at(currentIndex - 1).Id;
    },
  },
});
