import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Deck } from '../models/deck.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  findAll(): Observable<Deck[]> {
    return this.http.get<Deck[]>(
      this.configService.getApiUrl('/api/deck'));
  }
}
