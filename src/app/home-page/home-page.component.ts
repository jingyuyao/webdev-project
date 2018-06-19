import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Role } from '../models/user.model';
import { Deck } from '../models/deck.model';
import { UserService } from '../services/user.service';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  searchInput = new FormControl('');
  decks: Deck[] = [];
  loading = true;
  isAdmin = false;
  private userSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private deckService: DeckService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.currentUser().subscribe(
      user => this.isAdmin = user.roles.includes(Role.ADMIN),
    );

    this.searchInput.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title =>
        title === ''
          ? this.deckService.findAll()
          : this.deckService.findByFuzzyTitle(title)),
    ).subscribe(
      decks => {
        this.loading = false;
        this.decks = decks;
      },
      () => this.snackBar.open(
        'Unable to fetch decks', '', {duration: 1000}),
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
