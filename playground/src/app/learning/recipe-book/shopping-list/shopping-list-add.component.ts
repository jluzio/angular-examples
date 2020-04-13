import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: []
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
  @Input() item: Ingredient;
  isAdd = true;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    console.log("ngOnInit");    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges");
    this.isAdd = changes["item"].currentValue === null;
    if (this.isAdd) {
      this.item = this.createDefaultItem();
    }
  }

  onSubmit(newValues: Ingredient) {
    console.log("onSubmit");
    // NOTE: newValues is NOT a instance of Ingredient (due to form)
    let newIngredient = new Ingredient(newValues.name, newValues.amount);
    if (this.isAdd) {
      this.shoppingListService.addItems(newIngredient);
    } else {
      this.shoppingListService.updateItem(newIngredient, this.item);
    }
    this.newItem();
  }

  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.newItem();
  }

  onClear() {
    this.newItem();
  }

  newItem() {
    this.item = this.createDefaultItem();
    this.isAdd = true;
  }

  createDefaultItem() {
    return new Ingredient(null, null);
  }

}
