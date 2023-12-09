import ItemData from '../Data/Items.json';
import { Item } from '../Models/Item';
import { ProductionList } from '../Models/ProductionList';
import { useProductionListStore } from '../Stores/productionList';
import { keyBy } from 'lodash';

export const itemDictionary: Item[] = keyBy(ItemData.items, 'Id');

export function getItemFromId(id: string): Item {
  return itemDictionary[id];
}

export function getOutputTotal(item: Item, list?: ProductionList) {
  let inputItemList = null;

  if (list) {
    inputItemList = list?.Items.filter((productItem) => productItem.Id != '');
  } else {
    const { filteredProductionListItems } = useProductionListStore();
    inputItemList = filteredProductionListItems;
  }

  let count = 0;
  inputItemList.forEach((listItem) => {
    // For each addedItem.
    if (listItem.Id == item.Id) return;
    const listItemRecipe = getItemFromId(listItem.Id);
    listItemRecipe.Input.forEach((inputItem) => {
      if (inputItem.Id == item.Id || inputItem.Id == item.OriginalId) {
        const convertionRatio = inputItem.ProductionRate / listItemRecipe.ProductionRate;
        count += listItem.ItemsPerMinute * convertionRatio;
      }
    });
  });
  return count;
}

export function getInputTotal(item: Item, list?: ProductionList) {
  let inputItemList = null;
  if (list) {
    inputItemList = list?.Items.filter((productItem) => productItem.Id != '');
  } else {
    const { filteredProductionListItems } = useProductionListStore();
    inputItemList = filteredProductionListItems;
  }
  let byproductSum = 0;
  const items = inputItemList.filter((userInputItem) => {
    const listItem = getItemFromId(userInputItem.Id);
    if (item.CanBeByproduct) {
      listItem.Byproduct?.forEach((byproduct) => {
        if (byproduct.Id == item.Id) {
          const convertionRatio = byproduct.ProductionRate / listItem.ProductionRate;
          byproductSum += convertionRatio * userInputItem.ItemsPerMinute;
        }
      });
    }
    // Returns by name instead of Id, so that there's only one node per item even with multiple recipes.
    return listItem.Name == item.Name;
  });

  let sum = 0;
  items.forEach((item2) => {
    sum += parseFloat(`${item2.ItemsPerMinute}`);
  });

  // Calculate Byproduct.
  if (item.CanBeByproduct) {
    sum += byproductSum;
  }
  return sum;
}

export function getProductionRatio(input, output) {}

export function formatNumber(num) {
  let str = num.toFixed(2);
  str = str.replace(/\.00$/, '');
  str = str.replace(/(\.\d)0$/, '$1');
  return str;
}
