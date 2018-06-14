import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckViewerComponent } from './deck-viewer/deck-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    HomePageComponent,
    DeckListComponent,
    DeckViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
