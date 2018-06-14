import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<User> {
    return this.userService.currentUser().pipe(
      first(),
      tap(user => {
        if (!user) {
          alert(`You need to be logged in to visit ${state.url}`);
          this.router.navigate(['/']);
        }
      }),
    );
  }
}
