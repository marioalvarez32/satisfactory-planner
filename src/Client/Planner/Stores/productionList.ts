import { defineStore } from 'pinia';
import { ProductionList, ProductionListItem } from '../Models/ProductionList';
import { Item } from '../Models/Item';
import { getInputTotal, getItemFromId, getOutputTotal } from '../Utilities/ItemUtility';
import { cloneDeep } from 'lodash';

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
      return state.productionLists[this.getSelectedListIndex] ?? null;
    },
    getSelectedListItems(state): ProductionListItem[] {
      return state.productionLists[this.getSelectedListIndex]?.Items ?? [];
    },
    filteredProductionListItems(state): ProductionListItem[] {
      return this.getSelectedList?.Items.filter((productItem) => productItem.Id != '');
    },
    items(state): Item[] {
      const exportedItems: ProductionListItem[] = [...this.getExportedListItems];
      let items = [];
      items =
        this.filteredProductionListItems?.map((listItem: ProductionListItem) => {
          const item = getItemFromId(listItem.Id);
          item.OutputRate = getOutputTotal(item);
          item.InputRate = getInputTotal(item);
          // Check if item is also exported.
          const exportedItemIndex = exportedItems.findIndex((exportedListItem: ProductionListItem) => listItem.Id == exportedListItem.Id);
          if (exportedItemIndex != -1) {
            item.InputRate += parseFloat(`${exportedItems[exportedItemIndex].ItemsPerMinute}`);
            exportedItems.splice(exportedItemIndex, 1);
          }
          return item;
        }) ?? [];

      const exportedItemsToAdd = exportedItems.map((listItem: ProductionListItem) => {
        const item = getItemFromId(listItem.Id);
        item.OutputRate = getOutputTotal(item);
        item.InputRate = parseFloat(`${listItem.ItemsPerMinute}`);
        return item;
      });

      return [...items, ...exportedItemsToAdd];
    },
    getExportedListItems(state): ProductionListItem[] {
      const exportedItems = [];
      this.productionLists.forEach((list) => {
        if (list.Id == state.selectedListId) return;
        const exportedItemsPerList: ProductionListItem[] = list.Items.filter((item) => item.IsExported == true && item.ExportedTo == state.selectedListId);
        exportedItemsPerList.forEach((listItem) => {
          const copiedListItem: ProductionListItem = cloneDeep(listItem);
          const item = getItemFromId(copiedListItem.Id);
          const exportedItemOutputRate = getOutputTotal(item, list);
          const exportedItemInputRate = getInputTotal(item, list);
          const calculatedItemsPerMinute = exportedItemInputRate - exportedItemOutputRate;
          copiedListItem.ItemsPerMinute = Math.max(0, calculatedItemsPerMinute);
          exportedItems.push(copiedListItem);
        });
      });
      const combinedExportedItems = exportedItems.reduce((acc: ProductionListItem[], listItem: ProductionListItem) => {
        // listItem is reactive and will mutate data.
        const accListItemIndex = acc?.findIndex((accListItem) => accListItem.Id == listItem.Id);
        if (accListItemIndex != -1) {
          acc[accListItemIndex].ItemsPerMinute = parseFloat(`${listItem.ItemsPerMinute}`) + parseFloat(`${acc[accListItemIndex].ItemsPerMinute}`);
        } else {
          acc.push(listItem);
        }
        return acc;
      }, []);

      return combinedExportedItems;
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
    updateListItemWithIndex(index: number, newValue: ProductionListItem) {
      this.productionLists[this.getSelectedListIndex].Items[index] = newValue;
    },
    updateListItemWithId(id: string, newValue: ProductionListItem) {
      const index = this.productionLists[this.getSelectedListIndex].Items.findIndex((listItem) => listItem.Id == id);
      this.productionLists[this.getSelectedListIndex].Items[index] = newValue;
    },
    removeSelectedList() {
      const currentIndex = this.getSelectedListIndex;
      this.productionLists.splice(this.getSelectedListIndex, 1);
      this.selectedListId = this.productionLists.at(currentIndex - 1).Id;
    },
  },
});
