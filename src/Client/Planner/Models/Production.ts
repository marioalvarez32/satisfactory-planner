import Item from './Item';

export class Production {
  Input: ProductionInput[];
  Product: Item;
  ProductionRate: number;
  Level: number;

  constructor(product: Production) {
    this.Product = product.Product;
    this.ProductionRate = product.ProductionRate;
    this.Input = product.Input.map((input) => new ProductionInput(input));
    this.Level = product.Level;
  }
}

export class ProductionInput {
  Product: Item;
  ProductionRate: number;

  constructor(productionInput: ProductionInput) {
    this.Product = productionInput.Product;
    this.ProductionRate = productionInput.ProductionRate;
  }
}
