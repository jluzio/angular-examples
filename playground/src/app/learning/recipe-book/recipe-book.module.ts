import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RecipeBookRoutingModule } from './recipe-book-routing.module'
import { RecipeBookComponent } from './recipe-book.component'
import { RecipeBookHomeComponent } from './recipe-book-home.component'
import { RecipeBookHeaderComponent } from './recipe-book-header.component'
import { DropdownDirective } from './dropdown.directive'
import { RecipeService } from './recipes'
import { ShoppingListService } from './shopping-list'
import { StorageService } from './storage.service'
import { RestService } from './rest.service'
import { CommentService } from './comments/comment.service'
import { HttpClientModule } from '@angular/common/http'
import { AppCommonModule } from '@/app/app-common.module'
import { FirebaseAppService } from './firebase-app.service'

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeBookHomeComponent,
    RecipeBookHeaderComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppCommonModule,
    RecipeBookRoutingModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    StorageService,
    FirebaseAppService,
    RestService,
    CommentService
  ],
  bootstrap: [RecipeBookComponent]
})
export class RecipeBookModule { }
