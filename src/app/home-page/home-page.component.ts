import { Component, OnInit } from '@angular/core';

import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.deckService.findAll().subscribe(decks => console.log(decks));
  }
}
