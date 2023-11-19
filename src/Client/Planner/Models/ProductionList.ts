import Item from './Item'

export type ProductionList = {
  Items: ProductionListItem[]
}

export class ProductionListItem {
  Name: Item
  ItemsPerMinute: number

  constructor() {
    this.Name = new Item()
    this.ItemsPerMinute = 0
  }
}
