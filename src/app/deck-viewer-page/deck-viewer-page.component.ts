import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-deck-viewer-page',
  templateUrl: './deck-viewer-page.component.html',
  styleUrls: ['./deck-viewer-page.component.css']
})
export class DeckViewerPageComponent implements OnInit {
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
