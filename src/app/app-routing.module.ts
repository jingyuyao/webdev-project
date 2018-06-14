import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserResolver } from './resolvers/user.resolver';
import { DeckResolver } from './resolvers/deck.resolver';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyDecksPageComponent } from './my-decks-page/my-decks-page.component';
import { DeckViewerPageComponent } from './deck-viewer-page/deck-viewer-page.component';

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
    path: 'my-decks',
    component: MyDecksPageComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'deck/:id',
    component: DeckViewerPageComponent,
    resolve: {
      deck: DeckResolver,
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
