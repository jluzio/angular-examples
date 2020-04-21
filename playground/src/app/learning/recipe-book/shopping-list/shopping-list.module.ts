import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from './../shared/shared.module'
import { ShoppingListEditComponent } from './shopping-list-edit.component'
import { ShoppingListComponent } from './shopping-list.component'

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    // CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }
