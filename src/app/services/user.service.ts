import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { switchMap, map, catchError, distinctUntilChanged, tap } from 'rxjs/operators';

import { Identity } from '../models/identity.model';
import { User } from '../models/user.model';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUser$ = new ReplaySubject<User>(1);

  constructor(
    private http: HttpClient,
    private identityService: IdentityService,
  ) {
    // Sync current user with current identity.
    identityService.currentIdentity().pipe(
      switchMap(identity => {
        if (identity.loggedIn) {
          return this.logInOrRegister(identity);
        } else {
          return this.logOut().pipe(map(() => null));
        }
      }),
      catchError(() => of(null)),
      distinctUntilChanged(),
    ).subscribe(currentUser => this.currentUser$.next(currentUser));
  }

  /**
   * Emits the latest user or null if not logged in.
   *
   * Will not produce errors.
   */
  currentUser(): Observable<User> {
    return this.currentUser$;
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(
      '/api/profile',
      user,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true,
      },
    ).pipe(
      tap(updatedUser => this.currentUser$.next(updatedUser)),
    );
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
