import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'learning/recipe-book',
    loadChildren: () => import('./learning/recipe-book/recipe-book.module').then(m => m.RecipeBookModule)
  },
  // Wildcard to match any
  // { path: '**', component: HomeComponent },
]

// Lazy loading
// {path: '<path>', loadChildren: '<module-path>#<module-class>' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
