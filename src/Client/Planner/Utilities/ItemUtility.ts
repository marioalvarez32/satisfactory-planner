import ItemData from '../Data/Items.json5'; 
import { Item } from '../Models/Item';
import { useProductionListStore } from '../Stores/productionList';

export function getItemFromName(name: string): Item {
    const items = ItemData.items;
    for (let i = 0; i < ItemData.items.length; i++) {
      if (items.at(i)?.Name == name) {
        return items.at(i)
      }
    }
}

export function getOutputTotal(item: Item) {
    const { filteredProductionListItems } = useProductionListStore();
    
    let count = 0;
    filteredProductionListItems.forEach((listItem) => {
      // For each addedItem. 
      if(listItem.Name == item.Name) return
      const listItemRecipe = getItemFromName(listItem.Name); 
      listItemRecipe.Input.forEach((inputItem)=>{
        if(inputItem.Name == item.Name){
          const convertionRatio = inputItem.ProductionRate / listItemRecipe.ProductionRate;     
          count += (listItem.ItemsPerMinute * convertionRatio);
        }
      })
    });
    return count;
}

export function formatNumber(num) {
  let str = num.toFixed(2);
  str = str.replace(/\.00$/, '');
  str = str.replace(/(\.\d)0$/, '$1');
  return str;
}