import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deck, PlayerCardClass } from '../models/deck.model';
import { DeckService } from '../services/deck.service';
import { HsService } from '../services/hs.service';

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
    private hsService: HsService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const userId = data.user.id;
      this.deckService
        .findAllByUserId(userId)
        .subscribe(decks => this.decks = decks);
    });
    this.hsService
      .findByFuzzyName('fireb')
      .subscribe(hsCards => console.log(hsCards));
    this.hsService
      .findByFuzzyName('fireball')
      .subscribe(hsCards => console.log(hsCards));
  }

  createNewDeck() {
    this.deckService
      .createDeck(this.newDeck)
      .subscribe(
        deck => this.decks = [deck, ...this.decks],
        () => alert('Unable to create form'),
      );
  }
}
