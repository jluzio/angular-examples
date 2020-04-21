import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { RecipeService } from '../recipe.service'
import { Recipe } from '../recipe'
import { Ingredient } from '../../shared/ingredient'
import { MatDialog } from '@angular/material/dialog'
import { IngredientDialogComponent } from './ingredient-dialog.component'
import validators from '../../validators'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup
  editIngredientIndex: number | null = null
  recipeId: number
  paramsSub: Subscription
  recipe: Recipe

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {
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
      name: fb.control(recipe.name, validators.text),
      imagePath: fb.control(recipe.imagePath, validators.url),
      description: fb.control(recipe.description, validators.text),
      ingredients: ingredientsControl
    })
    if (recipe.ingredients) { // needed if recipe is given storage without the ingredients property
      recipe.ingredients.forEach(
        (ingredient, index) => {
          ingredientsControl.push(this.createIngredientGroup(ingredient))
        }
      )
    }
  }

  private createIngredientGroup(ingredient: Ingredient) {
    return this.formBuilder.group({
      name: this.formBuilder.control(ingredient.name, validators.text),
      amount: this.formBuilder.control(ingredient.amount, validators.number)
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

  onDeleteIngredient(index: number) {
    this.getIngredientsControl().removeAt(index)
  }

  onEditIngredient(index: number | null = null) {
    const ingredient = index != null ? this.getIngredientsControl().at(index).value : this.createDefaultIngredient()
    this.openDialog(ingredient)
    this.editIngredientIndex = index
  }

  openDialog(ingredient: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '250px',
      data: ingredient
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmitIngredient(result)
      }
    })
  }

  onSubmitIngredient(ingredient: Ingredient) {
    if (this.editIngredientIndex != null) {
      this.getIngredientsControl().at(this.editIngredientIndex).setValue(ingredient)
    } else {
      this.getIngredientsControl().push(this.createIngredientGroup(ingredient))
    }
    this.editIngredientIndex = null
  }

  private getIngredientsControl() {
    return (this.recipeForm.controls.ingredients as FormArray)
  }

  private navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  private createDefaultRecipe() {
    return new Recipe(null, '', '', '', [])
  }

  private createDefaultIngredient() {
    return new Ingredient('', 1)
  }

}
