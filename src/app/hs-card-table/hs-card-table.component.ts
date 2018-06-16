import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  displayedColumns: string[] = [];
  hsCards: HsCard[] = [];
  @Output() deleteCard = new EventEmitter<HsCard>();

  constructor(private hsService: HsService) { }

  ngOnInit() {
  }

  @Input()
  set cards(cards: Card[]) {
    this.hsCards = [];
    combineLatest(
      cards.map(card => this.hsService.findById(card.id))
    ).subscribe(hsCards => this.hsCards = hsCards);
  }

  @Input()
  set edit(edit: boolean) {
    const baseColumns = [
      'name',
      'type',
      'rarity',
      'cardClass',
      'cost',
      'attack',
      'health',
    ];
    this.displayedColumns =
      edit ? [...baseColumns, 'deleteCard'] : baseColumns;
  }
}
