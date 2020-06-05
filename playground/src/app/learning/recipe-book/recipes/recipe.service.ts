import { Injectable, EventEmitter } from '@angular/core'
import { StorageService } from '../storage.service'
import { Recipe } from './recipe'
import { Ingredient } from '../shared'
import { from } from 'rxjs'

@Injectable()
export class RecipeService {
  defaultRecipes: Recipe[] = [
    new Recipe(1, 'Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
      new Ingredient('Pork Meat', 1),
      new Ingredient('French Fries', 2)
    ]),
    new Recipe(2, 'Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [
      new Ingredient('Pork Meat', 1)
    ])
  ]
  recipes: Recipe[] = this.defaultRecipes
  recipesChanged = new EventEmitter<Recipe[]>()

  constructor(private storageService: StorageService) { }

  getRecipes() {
    return this.recipes
  }

  getRecipe(id: number) {
    return this.recipes[this.toIndex(id)]
  }

  deleteRecipe(recipe: Recipe) {
    return this.recipes.splice(this.recipes.indexOf(recipe), 1)
  }

  saveOrUpdateRecipe(recipeId: number, recipe: Recipe) {
    if (recipeId === null) {
      this.recipes.push(recipe)
      recipeId = this.toId(this.recipes.length - 1)
    } else {
      this.recipes[this.toIndex(recipeId)] = recipe
    }
    return recipeId
  }

  getRecipesStorage() {
    console.log('getRecipesStorage')
    this.recipes = []
    from(this.storageService.getRecipes()).subscribe(
      data => {
        console.log(JSON.stringify(data))
        this.recipes = data
        /*
        this.recipes = [];
        for (let key in data) {
          this.recipes.push(data[key]);
        }
        */
        console.log('Recipes: ' + this.recipes)
        this.recipes.forEach(r => console.log(JSON.stringify(r)))
        this.recipesChanged.emit(this.recipes)
      },
      error => {
        console.log('Unable to get recipes: ' + error)
        this.recipes = []
      }
    )
  }

  saveRecipesStorage() {
    console.log('saveRecipesStorage')
    from(this.storageService.postRecipes(this.recipes)).subscribe(
      data => {
        console.log('Recipes saved')
      },
      error => {
        console.log('Unable to save recipes: ' + error)
      }
    )
  }

  toId(index: number) {
    return index + 1
  }

  toIndex(id: number) {
    return id - 1
  }

}
