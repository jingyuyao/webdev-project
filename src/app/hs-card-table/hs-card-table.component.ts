import { Component, OnInit, Input } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Card } from '../models/card.model';
import { HsCard } from '../models/hs-card.model';
import { HsService } from '../services/hs.service';

@Component({
  selector: 'app-hs-card-table',
  templateUrl: './hs-card-table.component.html',
  styleUrls: ['./hs-card-table.component.css']
})
export class HsCardTableComponent implements OnInit {
  displayedColumns = [
    'name',
    'type',
    'rarity',
    'playerClass',
    'cost',
    'attack',
    'health',
  ];
  hsCards: HsCard[] = [];
  private _cards: Card[];

  constructor(private hsService: HsService) { }

  ngOnInit() {
  }

  @Input()
  set cards(cards: Card[]) {
    this._cards = cards;
    this.hsCards = [];
    combineLatest(
      this._cards.map(card => this.hsService.findById(card.id))
    ).subscribe(hsCards => this.hsCards = hsCards);
  }

  get cards(): Card[] {
    return this._cards;
  }
}
