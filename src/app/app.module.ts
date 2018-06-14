import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckViewerPageComponent } from './deck-viewer-page/deck-viewer-page.component';
import { HsCardTableComponent } from './hs-card-table/hs-card-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    HomePageComponent,
    DeckListComponent,
    DeckViewerPageComponent,
    HsCardTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
