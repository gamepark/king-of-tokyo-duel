import { DeckLocator } from '@gamepark/react-game'

export class PowerCardDeckLocator extends DeckLocator {
  coordinates = { x: -16, y: -15 }
  gap = { x: -0.03, y: -0.03 }
}

export const powerCardDeckLocator = new PowerCardDeckLocator()