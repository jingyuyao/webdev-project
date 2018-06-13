import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Identity } from '../models/identity.model';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  logInOrRegister(identity: Identity): Observable<User> {
    return this.http.post<User>(
      this.configService.getApiUrl('/api/logInOrRegister'),
      {
        identityProvider: identity.identityProvider,
        idToken: identity.idToken,
      },
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true,
      },
    );
  }

  logOut(): Observable<any> {
    return this.http.post<any>(
      this.configService.getApiUrl('/api/logOut'),
      null,
      {
        withCredentials: true,
      },
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(
      this.configService.getApiUrl('/api/profile'),
      {
        withCredentials: true,
      },
    );
  }
}
