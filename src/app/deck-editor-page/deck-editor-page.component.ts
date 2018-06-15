import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { HsCard } from '../models/hs-card.model';
import { DeckService } from '../services/deck.service';
import { HsService } from '../services/hs.service';

@Component({
  selector: 'app-deck-editor-page',
  templateUrl: './deck-editor-page.component.html',
  styleUrls: ['./deck-editor-page.component.css']
})
export class DeckEditorPageComponent implements OnInit {
  deck: Deck;
  cards: Card[] = [];
  hsCardSearch = new FormControl('', [
    Validators.required,
    this.requireNonString,
  ]);
  hsCardSearches: Observable<HsCard[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deckService: DeckService,
    private hsService: HsService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.hsCardSearch.reset('');
      this.deck = data.deck;
      this.deckService
        .findCardsByDeckId(this.deck.id)
        .subscribe(cards => this.cards = cards);
    });

    this.hsCardSearches = this.hsCardSearch.valueChanges.pipe(
      filter(value => typeof value === 'string'),
      filter(value => value.length > 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name =>
        this.hsService.findByFuzzyName(this.deck.cardClass, name)),
    );
  }

  deleteDeck() {
    this.deckService.deleteDeck(this.deck.id).subscribe(
      () => this.router.navigate(['/my-decks']),
      () => alert('Unable to delete deck'),
    );
  }

  addCard() {
    const hsCard = this.hsCardSearch.value;
    this.cards = [{id: hsCard.id}, ...this.cards];
    this.hsCardSearch.reset('');
    this.hsCardSearch.setErrors(null);
  }

  hsCardToString(hsCard?: HsCard): string | undefined {
    return hsCard ? hsCard.name : undefined;
  }

  requireNonString(
    control: AbstractControl): {[key: string]: any} | null {
      const forbidden = typeof control.value === 'string';
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    }
}
