import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HsCard } from '../models/hs-card.model';

@Injectable({
  providedIn: 'root'
})
export class HsService {

  constructor(
    private http: HttpClient,
  ) { }

  findById(id: number): Observable<HsCard[]> {
    return this.http.get<HsCard[]>(`/api/hs/cards/${id}`);
  }
}
