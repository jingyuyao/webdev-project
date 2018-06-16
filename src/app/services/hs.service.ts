import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { HsCard } from '../models/hs-card.model';

@Injectable({
  providedIn: 'root'
})
export class HsService {
  private static readonly CARDS_URL =
    'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json';
  private readonly hsCardMap$: Observable<Map<string, HsCard>>;

  constructor(http: HttpClient) {
    this.hsCardMap$ = http.get<HsCard[]>(HsService.CARDS_URL).pipe(
      map(hsCards =>
        new Map(
          hsCards.map((hsCard): [string, HsCard] =>
            [hsCard.id, hsCard]))),
      catchError(() => {
        return of(new Map());
      }),
      shareReplay(1),
    );
  }

  findById(id: string): Observable<HsCard> {
    return this.hsCardMap$.pipe(
      map(hsCardMap => {
        const hsCard = hsCardMap.get(id);
        if (hsCard === undefined) {
          throw new Error('not found');
        }
        return hsCard;
      }),
    );
  }

  findByFuzzyName(
    playerCardClass: string, name: string): Observable<HsCard[]> {
    const nameLower = name.toLowerCase();
    return this.hsCardMap$.pipe(
      map(hsCardMap => {
        const hsCards: HsCard[] = [];
        hsCardMap.forEach(hsCard => {
          const canBeUsedByPlayer =
            hsCard.cardClass === playerCardClass
              || hsCard.cardClass === 'NEUTRAL';
          if (canBeUsedByPlayer
              && hsCard.name.toLowerCase().includes(nameLower)) {
            hsCards.push(hsCard);
          }
        });
        return hsCards;
      }),
    );
  }
}
