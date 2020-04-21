import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Ingredient } from '../../shared'
import validators from '../../validators'

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
})
export class IngredientDialogComponent implements OnInit {
  ingredientForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientForm = this.createIngredientGroup(this.data)
  }

  onCancelClick(): void {
    this.dialogRef.close()
  }

  private createIngredientGroup(ingredient: Ingredient) {
    return this.formBuilder.group({
      name: this.formBuilder.control(ingredient.name, validators.text),
      amount: this.formBuilder.control(ingredient.amount, validators.number)
    })
  }

}
