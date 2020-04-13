import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeBookComponent } from './recipe-book.component'
import { RecipeBookHomeComponent } from './recipe-book-home.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeBookComponent,
    children: [
      { path: '', component: RecipeBookHomeComponent },
      { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
      { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    ]
  }
];

// Lazy loading
// {path: '<path>', loadChildren: '<module-path>#<module-class>' }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RecipeBookRoutingModule { }
