import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.currentUser().pipe(
        first(),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            alert(`You need to be logged in to visit ${state.url}`);
            this.router.navigate(['/']);
          }
        }),
      );
  }
}
