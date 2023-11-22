export class Item {
  Name: string;
  Input: ProductionInput[];
  ProductionRate: number;
  Level: number;
  InputRate?: number;
  OutputRate?: number;

  constructor(item: Item) {
    this.Name = item.Name;
    this.ProductionRate = item.ProductionRate;
    this.Input = item.Input.map((input) => new ProductionInput(input));
    this.Level = item.Level;
    this.OutputRate = 0;
  }
}

export class ProductionInput {
  Name: string;
  ProductionRate: number;

  constructor(productionInput: ProductionInput) {
    this.Name = productionInput.Name;
    this.ProductionRate = productionInput.ProductionRate;
  }
}
