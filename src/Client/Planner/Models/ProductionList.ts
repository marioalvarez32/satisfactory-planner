export type ProductionList = {
  Items: ProductionListItem[];
};

export class ProductionListItem {
  Name: string;
  ItemsPerMinute: number;

  constructor() {
    this.Name = '';
    this.ItemsPerMinute = 0;
  }
}
