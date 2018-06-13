import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
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
    canActivate: [AuthGuard],
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
