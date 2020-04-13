import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListAddComponent
  ],
  imports: [
    //CommonModule,
    SharedModule,
    FormsModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule { }
