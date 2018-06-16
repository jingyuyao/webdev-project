import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<User> {
    return this.userService.currentUser().pipe(
      take(1),
      tap(user => {
        if (!user) {
          this.snackBar.open(
            `You need to be logged in to visit ${state.url}`,
            '',
            {duration: 1000});
          this.router.navigate(['/']);
        }
      }),
    );
  }
}
