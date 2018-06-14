import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../models/card.model';

@Component({
  selector: 'app-hs-card-table',
  templateUrl: './hs-card-table.component.html',
  styleUrls: ['./hs-card-table.component.css']
})
export class HsCardTableComponent implements OnInit {
  private _cards: Card[];
  displayedColumns = ['id'];

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set cards(cards: Card[]) {
    this._cards = cards;
  }

  get cards(): Card[] {
    return this._cards;
  }
}
