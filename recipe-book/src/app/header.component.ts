import { RecipeService } from './recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService) { }

  ngOnInit() {
  }

  getItemsCount() {
    return this.shoppingListService.getItems().length;
  }

  onStoreRecipes() {
    this.recipeService.saveRecipesStorage();
  }

  onFetchRecipes() {
    this.recipeService.getRecipesStorage();
  }

}
