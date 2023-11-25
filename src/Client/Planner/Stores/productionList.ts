import { defineStore } from 'pinia';
import { ProductionListItem } from '../Models/ProductionList';
import { Item } from '../Models/Item';
import { getItemFromName, getOutputTotal } from '../Utilities/ItemUtility';

type State = {
  productionListItems: ProductionListItem[];
};
export const useProductionListStore = defineStore('production-list-store', {
  state: () => ({
    productionListItems: [new ProductionListItem()],
  }),
  getters: {
    filteredProductionListItems(state): ProductionListItem[] {
      return state.productionListItems.filter((productItem) => productItem.Name != '');
    },
    items(): Item[] {
      return this.filteredProductionListItems.map((listItem: ProductionListItem) => {
        const item = getItemFromName(listItem.Name);
        item.OutputRate = getOutputTotal(item);
        item.InputRate = parseFloat(`${listItem.ItemsPerMinute}`);
        return item;
      });
    },
  },
  actions: {},
});


