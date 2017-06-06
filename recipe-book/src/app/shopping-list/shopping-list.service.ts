import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient';

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  getItems() {
    return this.items;
  }

  addItems(...items: Ingredient[]) {
    Array.prototype.push.apply(this.items, items);
  }

  updateItem(item: Ingredient, oldItem: Ingredient) {
    this.items[this.items.indexOf(oldItem)] = item;
  }

  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
  
}
