import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-deck-viewer-page',
  templateUrl: './deck-viewer-page.component.html',
  styleUrls: ['./deck-viewer-page.component.css']
})
export class DeckViewerPageComponent implements OnInit {
  deck: Deck;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.deck = data.deck);
  }
}
