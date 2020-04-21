import { Component, OnInit, OnChanges, SimpleChanges, Input, Output } from '@angular/core'

import { ShoppingListService } from './shopping-list.service'
import { Ingredient } from '../shared/ingredient'
import { FormGroup, FormBuilder } from '@angular/forms'
import validators from '../validators'
import { EventEmitter } from '@angular/core'


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: 'shopping-list-edit.component.html',
  styles: []
})
export class ShoppingListEditComponent implements OnInit, OnChanges {
  @Input() ingredient: Ingredient
  @Input() isNew: boolean
  @Output() update = new EventEmitter<Ingredient>()
  @Output() delete = new EventEmitter<Ingredient>()
  @Output() cancel = new EventEmitter<Ingredient>()
  ingredientForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.ingredientForm = this.createIngredientGroup(this.ingredient)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ingredientForm = this.createIngredientGroup(this.ingredient)
  }

  onSubmit(newValues: Ingredient) {
    const ingredient = new Ingredient(newValues.name, newValues.amount)
    this.update.emit(ingredient)
  }

  onDelete() {
    this.delete.emit(this.ingredient)
  }

  onCancel() {
    this.cancel.emit(this.ingredient)
  }

  createDefaultItem() {
    return new Ingredient(null, null)
  }

  private createIngredientGroup(ingredient: Ingredient) {
    return this.formBuilder.group({
      name: this.formBuilder.control(ingredient.name, validators.text),
      amount: this.formBuilder.control(ingredient.amount, validators.number)
    })
  }

}
