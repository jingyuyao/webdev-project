import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, shareReplay } from 'rxjs/operators';

import { Identity } from '../models/identity.model';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUser$: Observable<User>;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private identityService: IdentityService,
  ) {
    this.currentUser$ = identityService.currentIdentity().pipe(
      switchMap(identity => {
        if (identity.loggedIn) {
          return this.logInOrRegister(identity);
        } else {
          return this.logOut().pipe(map(() => null));
        }
      }),
      catchError(() => of(null)),
      shareReplay(1),
    );
  }

  currentUser(): Observable<User> {
    return this.currentUser$;
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(
      this.configService.getApiUrl('/api/profile'),
      {
        withCredentials: true,
      },
    );
  }

  private logInOrRegister(identity: Identity): Observable<User> {
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

  private logOut(): Observable<any> {
    return this.http.post<any>(
      this.configService.getApiUrl('/api/logOut'),
      null,
      {
        withCredentials: true,
      },
    );
  }
}
