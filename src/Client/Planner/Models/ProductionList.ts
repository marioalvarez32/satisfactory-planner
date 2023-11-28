import { v4 as uuidv4 } from 'uuid';

export class ProductionList {
  Id: string;
  Name: string;
  Items: ProductionListItem[];

  constructor(name?: string) {
    this.Id = uuidv4();
    this.Name = name ?? 'Tab';
    this.Items = [];
  }
}

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
