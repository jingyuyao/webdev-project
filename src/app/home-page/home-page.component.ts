import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Deck } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  searchInput = new FormControl('');
  decks: Deck[] = [];
  loading = true;

  constructor(
    private deckService: DeckService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
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
}
