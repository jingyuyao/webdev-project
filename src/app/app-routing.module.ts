import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserResolver } from './resolvers/user.resolver';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
