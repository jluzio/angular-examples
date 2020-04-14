import { RecipeService } from './recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-book-header',
  templateUrl: './recipe-book-header.component.html'
})
export class RecipeBookHeaderComponent implements OnInit {
  modulePath = '/learning/recipe-book'

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
