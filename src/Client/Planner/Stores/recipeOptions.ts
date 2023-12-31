import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { StoredRecipeData } from '../Models/StoredRecipeData';
import { useStorage } from '@vueuse/core';
import ItemsData from '@/Client/Planner/Data/Items.json';

const initialRecipeData: StoredRecipeData = {
  enabledBaseRecipes: ItemsData.Items.filter((itemData) => !itemData.IsAlternateRecipe).map((itemData) => itemData.Id),
  enabledAlternateRecipes: [],
};
const storedRecipeData: Ref<StoredRecipeData> = useStorage('recipe-data', initialRecipeData, localStorage, { mergeDefaults: true });

type State = {
  enabledBaseRecipes: string[];
  enabledAlternateRecipes: string[];
};

export const useRecipeOptionStore = defineStore('recipe-option-store', {
  state: (): State => ({
    enabledBaseRecipes: storedRecipeData.value.enabledBaseRecipes || [],
    enabledAlternateRecipes: storedRecipeData.value.enabledAlternateRecipes || [],
  }),
  getters: {
    isItemEnabled:
      (state) =>
      (id: string): boolean => {
        return state.enabledBaseRecipes.includes(id) || state.enabledAlternateRecipes.includes(id);
      },
  },
  actions: {},
});
