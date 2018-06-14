import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../models/card.model';

@Component({
  selector: 'app-hs-card-table',
  templateUrl: './hs-card-table.component.html',
  styleUrls: ['./hs-card-table.component.css']
})
export class HsCardTableComponent implements OnInit {
  @Input() cards: Card[];
  displayedColumns = ['id'];

  constructor() { }

  ngOnInit() {
  }

}
