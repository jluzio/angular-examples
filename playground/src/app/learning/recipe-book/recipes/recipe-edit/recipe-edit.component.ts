import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { RecipeService } from '../recipe.service'
import { Recipe } from '../recipe'
import { Ingredient } from '../../shared/ingredient'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup
  editIngredientForm: FormGroup
  editIngredientIndex: number | null = null
  recipeId: number
  paramsSub: Subscription
  recipe: Recipe

  validators = {
    number: [Validators.required],
    text: [Validators.required, Validators.minLength(3)],
    url: [Validators.required, Validators.minLength(3), Validators.pattern(/https?:\/\/.+/i)]
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.paramsSub = route.params.subscribe(
      params => {
        this.recipeId = params.hasOwnProperty('id') ? +params.id : null
        if (this.recipeId === null) {
          this.recipe = this.createDefaultRecipe()
        } else {
          this.recipe = this.recipeService.getRecipe(this.recipeId)
        }
        this.initForm(this.recipe)
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe()
  }

  private initForm(recipe: Recipe) {
    const fb = this.formBuilder
    const ingredientsControl = fb.array([])
    this.recipeForm = fb.group({
      name: fb.control(recipe.name, this.validators.text),
      imagePath: fb.control(recipe.imagePath, this.validators.url),
      description: fb.control(recipe.description, this.validators.text),
      ingredients: ingredientsControl
    })
    if (recipe.ingredients) { // needed if recipe is given storage without the ingredients property
      recipe.ingredients.forEach(
        (ingredient, index) => {
          ingredientsControl.push(this.createIngredientGroup(ingredient))
        }
      )
    }

    this.editIngredientForm = this.createIngredientGroup(this.createDefaultIngredient())
  }

  private createIngredientGroup(ingredient: Ingredient) {
    return this.formBuilder.group({
      name: this.formBuilder.control(ingredient.name, this.validators.text),
      amount: this.formBuilder.control(ingredient.amount, this.validators.number)
    })
  }

  onSubmit() {
    console.log(this.recipeForm)
    console.log(this.recipeForm.value)
    // NOTE: this.recipeForm.value is NOT of type Recipe (but is a compatible map)
    const recipe: Recipe = this.recipeForm.value
    console.log(recipe)

    this.recipeService.saveOrUpdateRecipe(this.recipeId, recipe)
    this.navigateBack()
  }

  onCancel() {
    this.navigateBack()
  }

  onSubmitIngredient() {
    // NOTE: this.newIngredientForm.value is NOT of type Recipe (but is a compatible map)
    const ingredient: Ingredient = this.editIngredientForm.value
    if (this.editIngredientIndex != null) {
      this.getIngredientsControl().at(this.editIngredientIndex).setValue(ingredient)
    } else {
      this.getIngredientsControl().push(this.createIngredientGroup(ingredient))
    }
    this.editIngredientForm.reset(this.createDefaultIngredient())
    this.editIngredientIndex = null
  }

  onDeleteIngredient(index: number) {
    this.getIngredientsControl().removeAt(index)
  }

  onEditIngredient(index: number) {
    const ingredientControl = this.getIngredientsControl().at(index)
    this.editIngredientForm.setValue(ingredientControl.value)
    this.editIngredientIndex = index
  }

  private getIngredientsControl() {
    return (<FormArray>this.recipeForm.controls.ingredients)
  }

  private navigateBack() {
    console.log('navigateBack')
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  private createDefaultRecipe() {
    return new Recipe(null, '', '', '', [])
  }

  private createDefaultIngredient() {
    return new Ingredient('', 1)
  }

}