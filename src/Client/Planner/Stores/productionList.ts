import { defineStore } from 'pinia';
import { ProductionListItem } from '../Models/ProductionList';
import { Item } from '../Models/Item';
import { getInputTotal, getItemFromId, getOutputTotal } from '../Utilities/ItemUtility';

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
  },
  actions: {},
});
