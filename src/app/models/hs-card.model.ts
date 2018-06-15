/**
 * External card representation.
 *
 * See https://hearthstonejson.com/docs/cards.html
 */
export interface HsCard {
  id: string;
  name: string;
  text: string;
  type: string;
  cardClass: string;
  rarity: string;
  set: string;
  cost: number;
  attack?: number;
  health?: number;
  race?: string;
  durability?: number;
  armor?: number;
}
