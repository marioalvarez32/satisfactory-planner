export type ProductionList = {
  Items: ProductionListItem[];
};

export class ProductionListItem {
  Id: string;
  Name: string;
  ItemsPerMinute: number;

  constructor() {
    this.Id = '';
    this.Name = '';
    this.ItemsPerMinute = 0;
  }
}
