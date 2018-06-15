import { Component, Input } from '@angular/core';

import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent {
  @Input() decks: Deck[];
  @Input() edit: boolean;

  constructor() { }
}
