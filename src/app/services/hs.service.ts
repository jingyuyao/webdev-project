import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { tap, flatMap, map, catchError, shareReplay } from 'rxjs/operators';
import * as localForage from 'localforage';

import { HsCard } from '../models/hs-card.model';

@Injectable({
  providedIn: 'root'
})
export class HsService {
  private static readonly STORE_NAME = 'HsService';
  private static readonly CARDS_URL =
    'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json';
  private readonly store = localForage.createInstance({
    name: HsService.STORE_NAME,
  });
  private loaded: Observable<boolean>;

  constructor(http: HttpClient) {
    this.loaded = http.get<HsCard[]>(HsService.CARDS_URL).pipe(
      flatMap(hsCards => {
        const savePromises =
          hsCards.map(hsCard => this.store.setItem(hsCard.id, hsCard));
        const allSavesPromise = Promise.all(savePromises);
        return from(allSavesPromise);
      }),
      map(() => true),
      catchError(() => of(false)),
      tap(loaded => {
        console.log(`Cards loaded: ${loaded}`);
        this.store.length().then(l => console.log(`${l} cards in store`));
      }),
      shareReplay(1),
    );
  }

  findById(id: string): Observable<HsCard> {
    return this.loaded.pipe(
      flatMap(() => from(this.store.getItem(id))),
    );
  }
}
