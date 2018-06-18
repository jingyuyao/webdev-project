import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Deck, PlayerCardClass } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-my-decks-page',
  templateUrl: './my-decks-page.component.html',
  styleUrls: ['./my-decks-page.component.css']
})
export class MyDecksPageComponent implements OnInit {
  newDeckForm: FormGroup;
  playerCardClasses = Object.values(PlayerCardClass);
  decks: Deck[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.newDeckForm = this.fb.group({
      cardClass: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.data.subscribe(data => {
      const userId = data.user.id;
      this.loading = true;
      this.deckService
        .findAllByUserId(userId)
        .subscribe(decks => {
          this.loading = false;
          this.decks = decks;
        });
    });
  }

  createNewDeck(newDeckFormDirective: FormGroupDirective) {
    this.deckService
      .createDeck(this.newDeckForm.value as Deck)
      .subscribe(
        deck => this.decks = [deck, ...this.decks],
        () => this.snackBar.open(
          'Unable to create deck', '', {duration: 1000}),
      );
    newDeckFormDirective.resetForm();
  }
}
