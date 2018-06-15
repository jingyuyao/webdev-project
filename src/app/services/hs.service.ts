import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, from, of } from 'rxjs';
import { flatMap, map, catchError, take } from 'rxjs/operators';
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
  private readonly loaded$ = new ReplaySubject<boolean>(1);

  constructor(http: HttpClient) {
    http.get<HsCard[]>(HsService.CARDS_URL).pipe(
      flatMap(hsCards => {
        const savePromises =
          hsCards.map(hsCard => this.store.setItem(hsCard.id, hsCard));
        const allSavesPromise = Promise.all(savePromises);
        return from(allSavesPromise);
      }),
      map(() => true),
      catchError(() => of(false)),
    ).subscribe(loaded => {
      console.log(`Cards loaded: ${loaded}`);
      this.store.length().then(l => console.log(`${l} cards in store`));
      this.loaded$.next(loaded);
      this.loaded$.complete();
    });
  }

  findById(id: string): Observable<HsCard> {
    return this.loaded$.pipe(
      flatMap(() => from(this.store.getItem(id))),
      take(1),
    );
  }

  findByFuzzyName(playerCardClass: string, name: string): Observable<HsCard[]> {
    const nameLower = name.toLowerCase();
    return this.loaded$.pipe(
      flatMap(() => {
        const hsCards: HsCard[] = [];
        return from(
          this.store.iterate<HsCard, void>(
            hsCard => {
              const canBeUsedByPlayer =
                hsCard.cardClass === playerCardClass
                  || hsCard.cardClass === 'NEUTRAL';
              if (canBeUsedByPlayer
                    && hsCard.name.toLowerCase().includes(nameLower)) {
                hsCards.push(hsCard);
              }
            })
            .then(() => hsCards)
        );
      }),
      take(1),
    );
  }
}
