import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipeId: number;
  paramSubscription: Subscription;

  constructor(private recipeService: RecipeService, 
    private shoppingListService: ShoppingListService, 
    private route: ActivatedRoute,
    private router: Router) { 
    }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeId = params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeId);
      }
    );
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.shoppingListService.addItems(...this.selectedRecipe.ingredients);
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
  
}
