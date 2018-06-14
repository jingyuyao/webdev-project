import { Component, OnInit } from '@angular/core';

import { Deck } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.deckService.findAll().subscribe(decks => this.decks = decks);
  }
}
