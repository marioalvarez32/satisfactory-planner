export class Item {
  Id: string;
  Name: string;
  Input: ProductionInput[];
  ProductionRate: number;
  Level: number;
  InputRate?: number;
  OutputRate?: number;
  EdgeType: string;

  constructor(item: Item) {
    this.Id = item.Id;
    this.Name = item.Name;
    this.ProductionRate = item.ProductionRate;
    this.Input = item.Input.map((input) => new ProductionInput(input));
    this.Level = item.Level;
    this.OutputRate = 0;
    this.EdgeType = item.EdgeType;
  }
}

export class ProductionInput {
  Id: string;
  ProductionRate: number;

  constructor(productionInput: ProductionInput) {
    this.Id = productionInput.Id;
    this.ProductionRate = productionInput.ProductionRate;
  }
}
