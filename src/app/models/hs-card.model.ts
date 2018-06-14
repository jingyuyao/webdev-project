/**
 * External card representation.
 *
 * See https://market.mashape.com/omgvamp/hearthstone#single-card
 */
export interface HsCard {
  cardId: string;
  name: string;
  text: string;
  type: string;
  img: string;
  playerClass: string;
  cardSet: string;
  rarity: string;
  cost: number;
  attack?: number;
  health?: number;
  race?: string;
}
