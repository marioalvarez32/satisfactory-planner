import { defineStore } from 'pinia';
import { ProductionListItem } from '../Models/ProductionList';
import { Item } from '../Models/Item';
import { getInputTotal, getItemFromId, getOutputTotal } from '../Utilities/ItemUtility';
import { find } from 'lodash';

type State = {
  productionListItems: ProductionListItem[];
};
export const useProductionListStore = defineStore('production-list-store', {
  state: () => ({
    productionListItems: [new ProductionListItem()],
  }),
  getters: {
    filteredProductionListItems(state): ProductionListItem[] {
      return state.productionListItems.filter((productItem) => productItem.Id != '');
    },
    items(): Item[] {
      return this.filteredProductionListItems.map((listItem: ProductionListItem) => {
        const item = getItemFromId(listItem.Id);
        item.OutputRate = getOutputTotal(item);
        item.InputRate = getInputTotal(item);
        return item;
      });
    },
    getListItemById:
      (state) =>
      (id: string): ProductionListItem => {
        return find(state.productionListItems, (listItem) => listItem.Id == id);
      },
  },
  actions: {
    updateListItem(index: number, newValue: ProductionListItem) {
      this.productionListItems[index] = newValue;
    },
  },
});
