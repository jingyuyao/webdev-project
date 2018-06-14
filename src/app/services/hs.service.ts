import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HsCard } from '../models/hs-card.model';

@Injectable({
  providedIn: 'root'
})
export class HsService {

  constructor(
    private http: HttpClient,
  ) { }

  findById(id: string): Observable<HsCard> {
    return this.http.get<HsCard[]>(`/api/hs/cards/${id}`).pipe(
      map(hsCards => hsCards[0])
    );
  }
}
