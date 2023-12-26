import { getRecipeFromId } from '@/Client/Planner/Utilities/ItemUtility';

export class TableItem {
  Id: string;
  Item: TableProductionItem;
  Input: TableProductionItem[];
  Product: TableProductionItem[];

  constructor(id: string) {
    this.Id = id;
    const recipe = getRecipeFromId(id);
    this.Item = new TableProductionItem(id, recipe.ProductionRate);
    this.Input = recipe.Input?.map((item) => new TableProductionItem(item.Id, item.ProductionRate)) ?? [];
    this.Product = recipe.Product?.map((item) => new TableProductionItem(item.Id, item.ProductionRate)) ?? [];
  }
}

export class TableProductionItem {
  Name: string;
  AlternateName?: string;
  ItemsPerMinute: number;

  constructor(id: string, productionRate: number) {
    const recipe = getRecipeFromId(id);
    this.Name = recipe.Name;
    this.AlternateName = recipe.AlternateName ?? null;
    this.ItemsPerMinute = productionRate;
  }
}
