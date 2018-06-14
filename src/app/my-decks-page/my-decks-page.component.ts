import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deck } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-my-decks-page',
  templateUrl: './my-decks-page.component.html',
  styleUrls: ['./my-decks-page.component.css']
})
export class MyDecksPageComponent implements OnInit {
  decks: Deck[] = [];

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const userId = data.user.id;
      this.deckService
        .findAllByUserId(userId)
        .subscribe(decks => this.decks = decks);
    });
  }
}
