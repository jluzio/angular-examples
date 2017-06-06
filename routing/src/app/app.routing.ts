import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home-component.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const appRoutes: Routes = [
    { path: 'user/:id', component: UserComponent },
    { path: 'user/:id/detail', component: UserDetailComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];
