import { defineStore } from 'pinia';
import { ProductionListItem } from '../Models/ProductionList';
type State = {
  productionItems: ProductionListItem[];
};
export const useProductionListStore = defineStore('production-list-store', {
  state: () => ({
    productionItems: [new ProductionListItem()],
  }),
  getters: {},
  actions: {},
});
