export interface Deck {
  id: number;
  title: string;
  description: string;
  cardClass: PlayerCardClass;
}

export enum PlayerCardClass {
  MAGE = 'MAGE',
  PALADIN = 'PALADIN',
  HUNTER = 'HUNTER',
  DRUID = 'DRUID',
  PRIEST = 'PRIEST',
  ROGUE = 'ROGUE',
  SHAMAN = 'SHAMAN',
  WARLOCK = 'WARLOCK',
  WARRIOR = 'WARRIOR',
}
