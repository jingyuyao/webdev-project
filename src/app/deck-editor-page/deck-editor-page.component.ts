import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, flatMap, switchMap, tap, map } from 'rxjs/operators';

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
  cards: Card[] = [];
  deckForm: FormGroup;
  searchForm: FormGroup;
  hsCardSearches: Observable<HsCard[]>;
  private deck: Deck;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deckService: DeckService,
    private hsService: HsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.deckForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.searchForm = this.fb.group({
      hsCard: ['', [Validators.required, this.requireNonString]],
    });

    this.route.data.subscribe(data => {
      this.deck = data.deck;
      this.setDeckForm(this.deck);
      this.resetSearchForm();
      this.cards = [];
      this.deckService
        .findCardsByDeckId(this.deck.id)
        .subscribe(cards => this.cards = cards);
    });

    this.hsCardSearches =
      this.searchForm.get('hsCard').valueChanges.pipe(
        filter(value => typeof value === 'string'),
        filter(value => value.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(name =>
          this.hsService.findByFuzzyName(this.deck.cardClass, name)),
        map(hsCards => hsCards.slice(0, 5)),
      );
  }

  setDeckForm(deck: Deck) {
    this.deckForm.setValue({
      title: deck.title,
      description: deck.description,
    });
  }

  resetSearchForm(searchFormDirective?: FormGroupDirective) {
    this.searchForm.reset({
      hsCard: '',
    });
    // https://stackoverflow.com/a/48217303
    if (searchFormDirective) {
      searchFormDirective.resetForm();
    }
  }

  deleteDeck() {
    this.deckService.deleteDeck(this.deck.id).subscribe(
      () => this.router.navigate(['/my-decks']),
      () => this.snackBar.open(
        'Unable to delete deck', '', {duration: 1000}),
    );
  }

  saveDeck() {
    this.snackBar.open('Updating deck...');
    const updatedDeck = {
      ...this.deck,
      ...this.deckForm.value,
    };
    this.deckService.updateDeck(updatedDeck).pipe(
      tap(savedDeck => this.deck = savedDeck),
      flatMap(() =>
        this.deckService.updateDeckCards(this.deck.id, this.cards)),
    ).subscribe(
      () => this.snackBar.open('Updated deck', '', {duration: 1000}),
      () => this.snackBar.open(
        'Unable to update deck', '', {duration: 1000}),
    );
  }

  addCard(searchFormDirective: FormGroupDirective) {
    const hsCard = this.searchForm.value.hsCard;
    this.cards = [{id: hsCard.id}, ...this.cards];
    this.resetSearchForm(searchFormDirective);
  }

  deleteCard(hsCard: HsCard) {
    this.cards = this.cards.filter(card => card.id !== hsCard.id);
  }

  hsCardToString(hsCard?: HsCard): string | undefined {
    return hsCard ? hsCard.name : undefined;
  }

  requireNonString(
    control: AbstractControl): {[key: string]: any} | null {
      const forbidden = typeof control.value === 'string';
      return forbidden
        ? {'forbiddenName': {value: control.value}} : null;
    }
}
