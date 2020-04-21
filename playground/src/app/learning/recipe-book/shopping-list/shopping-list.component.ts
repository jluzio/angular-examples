import { Component, OnInit } from '@angular/core'

import { Ingredient } from '../shared'
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = []
  selectedItem: Ingredient = null
  isNewItem = true

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingListService.getItems()
  }

  onSelectItem(item: Ingredient) {
    this.isNewItem = false
    this.selectedItem = item
  }

  onUpdateItem(ingredient: Ingredient) {
    if (this.isNewItem) {
      this.shoppingListService.addItems(ingredient)
    } else {
      this.shoppingListService.updateItem(ingredient, this.selectedItem)
    }
    this.selectedItem = null
  }

  onCancelUpdateItem(ingredient: Ingredient) {
    this.selectedItem = null
  }

  onDeleteItem(ingredient: Ingredient) {
    this.shoppingListService.deleteItem(this.selectedItem)
    this.selectedItem = null
  }

  onNewItem() {
    this.isNewItem = true
    this.selectedItem = {
      name: '',
      amount: 1
    }
  }

}
