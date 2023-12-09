export class Item {
  Id: string;
  OriginalId?: string;
  Name: string;
  Input: ProductionInput[];
  ProductionRate: number;
  Level: number;
  InputRate?: number;
  OutputRate?: number;
  AlternateName?: string;
  Byproduct: ProductionInput[];
  CanBeByproduct: boolean;

  constructor(item: Item) {
    this.Id = item.Id;
    this.OriginalId = item.OriginalId ?? null;
    this.Name = item.Name;
    this.ProductionRate = item.ProductionRate;
    this.Input = item.Input.map((input) => new ProductionInput(input));
    this.Level = item.Level;
    this.OutputRate = 0;
    this.AlternateName = item.AlternateName ?? null;
    this.Byproduct = item.Byproduct;
    this.CanBeByproduct = !!item.CanBeByproduct;
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
