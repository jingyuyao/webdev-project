import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Deck[]> {
    return this.http.get<Deck[]>('/api/deck');
  }

  findById(id: number): Observable<Deck> {
    return this.http.get<Deck>(`/api/deck/${id}`);
  }

  findCardsByDeckId(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(`/api/deck/${id}/cards`);
  }
}
