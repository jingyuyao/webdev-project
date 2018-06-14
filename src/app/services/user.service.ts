import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, distinctUntilChanged, shareReplay } from 'rxjs/operators';

import { Identity } from '../models/identity.model';
import { User } from '../models/user.model';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUser$: Observable<User>;

  constructor(
    private http: HttpClient,
    private identityService: IdentityService,
  ) {
    // Sync current user with current identity.
    this.currentUser$ = identityService.currentIdentity().pipe(
      switchMap(identity => {
        if (identity.loggedIn) {
          return this.logInOrRegister(identity);
        } else {
          return this.logOut().pipe(map(() => null));
        }
      }),
      catchError(() => of(null)),
      distinctUntilChanged(),
      // Save the last user for late subscribers.
      shareReplay(1),
    );
  }

  /**
   * Emits the latest user or null if not logged in.
   *
   * Will not produce errors.
   */
  currentUser(): Observable<User> {
    return this.currentUser$;
  }

  private logInOrRegister(identity: Identity): Observable<User> {
    return this.http.post<User>(
      '/api/logInOrRegister',
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
      '/api/logOut',
      null,
      {
        withCredentials: true,
      },
    );
  }
}
