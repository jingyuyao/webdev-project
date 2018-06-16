import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Deck } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Injectable({
  providedIn: 'root'
})
export class DeckResolver implements Resolve<Deck> {
  constructor(
    private router: Router,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
  ) { }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Deck> {
    const id = Number(next.params.id);
    return this.deckService.findById(id).pipe(
      catchError(() => {
        this.snackBar.open(
          `Deck ${id} not found`, '', {duration: 1000});
        this.router.navigate(['/']);
        return of(null);
      }),
    );
  }
}
