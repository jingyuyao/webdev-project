import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck-editor-page',
  templateUrl: './deck-editor-page.component.html',
  styleUrls: ['./deck-editor-page.component.css']
})
export class DeckEditorPageComponent implements OnInit {
  deck: Deck;
  cards: Card[] = [];

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.deck = data.deck;
      this.deckService
        .findCardsByDeckId(this.deck.id)
        .subscribe(cards => this.cards = cards);
    });
  }
}
