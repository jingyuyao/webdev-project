import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Deck, PlayerCardClass } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-my-decks-page',
  templateUrl: './my-decks-page.component.html',
  styleUrls: ['./my-decks-page.component.css']
})
export class MyDecksPageComponent implements OnInit {
  newDeck: Deck = {
    id: 0,
    title: '',
    description: '',
    cardClass: PlayerCardClass.MAGE,
  };
  playerCardClasses = Object.values(PlayerCardClass);
  decks: Deck[] = [];

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const userId = data.user.id;
      this.deckService
        .findAllByUserId(userId)
        .subscribe(decks => this.decks = decks);
    });
  }

  createNewDeck() {
    this.deckService
      .createDeck(this.newDeck)
      .subscribe(
        deck => this.decks = [deck, ...this.decks],
        () => this.snackBar.open(
          'Unable to create deck', '', {duration: 1000}),
      );
  }
}
