import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PingService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService) { }

  getPong(): Observable<Pong> {
    return this.http.get<Pong>(this.configService.getApiUrl('/ping'));
  }
}

export interface Pong {
  data: string;
}
